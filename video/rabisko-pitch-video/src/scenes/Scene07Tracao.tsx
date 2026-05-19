import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { colors, fonts } from '../tokens';
import { easeIn, easeOut } from '../styles/easings';

loadBebas();
loadInter();
loadDM();

// Cena 7 ocupa 1800 frames (30s). useCurrentFrame() devolve 0-1800.
// 4 blocos sequenciais (foco único, fade entre eles):
//   Bloco 1 PARCEIROS    0-480     (8s)
//   Bloco 2 GTM          480-960   (8s = 3 sub-frentes compactas de 160 frames cada)
//   Bloco 3 ROADMAP      960-1380  (7s, versão enxuta — entradas rápidas)
//   Bloco 4 TATTOO WEEK  1380-1800 (7s — full-bleed com vídeo + texto à esquerda)

const SectionHeader: React.FC<{
  text: string;
  opacity: number;
  translateY: number;
}> = ({ text, opacity, translateY }) => (
  <div
    style={{
      fontFamily: fonts.dm,
      fontSize: 22,
      color: colors.preto,
      opacity: opacity * 0.6,
      letterSpacing: '0.3em',
      fontWeight: 500,
      transform: `translateY(${translateY}px)`,
      marginBottom: 64,
      textAlign: 'center',
    }}
  >
    {text}
  </div>
);

const Bloco1Parceiros: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  const opacity = active
    ? Math.min(
        interpolate(frame, [0, 60], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: easeIn,
        }),
        interpolate(frame, [420, 480], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: easeOut,
        })
      )
    : 0;

  const ty = interpolate(frame, [0, 60], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const parceiros = [
    { tipo: 'INFRAESTRUTURA', nome: 'Microsoft Azure' },
    { tipo: 'PILOTO', nome: 'Tatuadores & Estúdios' },
  ];

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '88%',
        }}
      >
        <SectionHeader
          text="PARCEIROS TECNOLÓGICOS"
          opacity={1}
          translateY={ty}
        />
        <div
          style={{
            display: 'flex',
            gap: 48,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {parceiros.map((p, i) => {
            const start = 30 + i * 30;
            const o = interpolate(frame, [start, start + 36], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: easeIn,
            });
            const dy = interpolate(frame, [start, start + 36], [22, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: easeIn,
            });
            return (
              <div
                key={p.tipo}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.12)',
                  padding: '64px 56px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 28,
                  textAlign: 'left',
                  opacity: o,
                  transform: `translateY(${dy}px)`,
                  minHeight: 280,
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.dm,
                    fontSize: 18,
                    color: colors.violeta,
                    letterSpacing: '0.28em',
                    fontWeight: 500,
                  }}
                >
                  {p.tipo}
                </div>
                <div
                  style={{
                    fontFamily: fonts.bebas,
                    fontSize: 76,
                    color: colors.preto,
                    letterSpacing: '0.03em',
                    lineHeight: 1,
                  }}
                >
                  {p.nome}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Sub-cena de UMA frente. Dura 160 frames (~2.67s) — versão compacta para
// caber 3 frentes em 8s. useCurrentFrame() devolve 0-160 (renderizada dentro
// de um <Sequence from={...}>).
//
// Sub-beats (proporcionais à versão original de 300f, fator 0.533):
//   0-16    vídeo fade-in vindo da direita (translateX 80→0). Sem texto.
//   16-32   vídeo total. Gradiente preto aparece do lado do texto.
//   32-48   número "0X" entra (slide do lado + fade).
//   48-80   título entra (mesma direção).
//   80-112  descrição entra (mesma direção).
//   112-144 estável.
//   144-160 fade-out de tudo.
const FrenteSubScene: React.FC<{
  num: string;
  titulo: string;
  desc: string;
  videoSrc: string;
  side: 'left' | 'right';
}> = ({ num, titulo, desc, videoSrc, side }) => {
  const localFrame = useCurrentFrame();

  const videoOpacityIn = interpolate(localFrame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const videoTranslateX = interpolate(localFrame, [0, 16], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const fadeOutAll = interpolate(localFrame, [144, 160], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const videoOpacity = Math.min(videoOpacityIn, fadeOutAll);

  const gradientOpacity = Math.min(
    interpolate(localFrame, [16, 32], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );

  const textEnterFrom = side === 'left' ? -60 : 60;

  const numOpacity = Math.min(
    interpolate(localFrame, [32, 48], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const numTranslate = interpolate(localFrame, [32, 48], [textEnterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const tituloOpacity = Math.min(
    interpolate(localFrame, [48, 80], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const tituloTranslate = interpolate(
    localFrame,
    [48, 80],
    [textEnterFrom, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  const descOpacity = Math.min(
    interpolate(localFrame, [80, 112], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const descTranslate = interpolate(
    localFrame,
    [80, 112],
    [textEnterFrom, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  const gradientDirection = side === 'left' ? 'to right' : 'to left';

  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* Vídeo de fundo */}
      <AbsoluteFill
        style={{
          opacity: videoOpacity,
          transform: `translateX(${videoTranslateX}px)`,
        }}
      >
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          muted
        />
      </AbsoluteFill>

      {/* Gradiente preto reforçando o lado do texto */}
      <AbsoluteFill
        style={{
          opacity: gradientOpacity,
          background: `linear-gradient(${gradientDirection}, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)`,
        }}
      />

      {/* Bloco de texto posicionado no canto superior */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          ...(side === 'left' ? { left: '7%' } : { right: '7%' }),
          maxWidth: '46%',
          textAlign: side === 'left' ? 'left' : 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          alignItems: side === 'left' ? 'flex-start' : 'flex-end',
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 110,
            color: colors.violeta,
            letterSpacing: '0.04em',
            lineHeight: 1,
            opacity: numOpacity,
            transform: `translateX(${numTranslate}px)`,
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 160,
            color: colors.gelo,
            letterSpacing: '0.03em',
            lineHeight: 0.95,
            opacity: tituloOpacity,
            transform: `translateX(${tituloTranslate}px)`,
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            fontFamily: fonts.inter,
            fontWeight: 300,
            fontSize: 26,
            color: colors.gelo,
            opacity: descOpacity * 0.9,
            lineHeight: 1.5,
            maxWidth: 640,
            transform: `translateX(${descTranslate}px)`,
            marginTop: 8,
          }}
        >
          {desc}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FRENTES: ReadonlyArray<{
  num: string;
  titulo: string;
  desc: string;
  videoSrc: string;
  side: 'left' | 'right';
}> = [
  {
    num: '01',
    titulo: 'INSTAGRAM',
    desc: 'Contato direto com testes promocionais e divulgação de artistas que usam.',
    videoSrc: 'assets/instagram.mp4',
    side: 'left',
  },
  {
    num: '02',
    titulo: 'PARCERIAS',
    desc: 'Estúdios para onboarding assistido e validação durante o piloto.',
    videoSrc: 'assets/parceria.mp4',
    side: 'right',
  },
  {
    num: '03',
    titulo: 'EVENTOS',
    desc: 'Presença em eventos do setor para captação e exposição.',
    videoSrc: 'assets/eventos.mp4',
    side: 'left',
  },
];

const Bloco2Gtm: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <AbsoluteFill>
      {FRENTES.map((f, i) => (
        <Sequence
          key={f.num}
          from={i * 160}
          durationInFrames={160}
          layout="none"
        >
          <FrenteSubScene
            num={f.num}
            titulo={f.titulo}
            desc={f.desc}
            videoSrc={f.videoSrc}
            side={f.side}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const Bloco3Roadmap: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - 960;

  // Versão enxuta (420 frames, 7s) — fades + stagger mais rápidos.
  //   0-30    opacity geral fade-in
  //   30-90   linha base desenha
  //   90-180  3 marcos com stagger de 30f (fade-in 30f)
  //   200-260 métricas fade-in
  //   260-420 estável (~2.7s)
  const opacity = active
    ? interpolate(localFrame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: easeIn,
      })
    : 0;

  const headerTy = interpolate(localFrame, [0, 30], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const lineScaleX = interpolate(localFrame, [30, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const marcos = [
    { data: '2026', desc: 'Projeto piloto com parceiros', destaque: false },
    { data: 'NOV 2027', desc: 'Tattoo Week SP — entrada em escala', destaque: true },
    { data: 'DEZ 2028', desc: '84 estúdios pagantes em São Paulo', destaque: false },
  ];

  const marcoStart = 90;
  const marcoStagger = 30;

  const metricsStart = 200;
  const metricsOpacity = interpolate(
    localFrame,
    [metricsStart, metricsStart + 60],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  const metricsY = interpolate(
    localFrame,
    [metricsStart, metricsStart + 60],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '92%',
          gap: 0,
        }}
      >
        <SectionHeader
          text="ROADMAP COMERCIAL"
          opacity={1}
          translateY={headerTy}
        />

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            width: '92%',
            height: 280,
            marginBottom: 80,
          }}
        >
          {/* Linha base — alinhada ao centro vertical do "slot" das bolinhas (32px = metade da maior bolinha 64px) */}
          <div
            style={{
              position: 'absolute',
              top: 32,
              left: 0,
              right: 0,
              height: 2,
              background: 'rgba(0,0,0,0.3)',
              transform: `scaleX(${lineScaleX})`,
              transformOrigin: 'left center',
            }}
          />

          {/* Marcos */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {marcos.map((m, i) => {
              const start = marcoStart + i * marcoStagger;
              const o = interpolate(localFrame, [start, start + 30], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: easeIn,
              });
              const s = interpolate(localFrame, [start, start + 30], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: easeIn,
              });
              const pontoSize = m.destaque ? 64 : 48;
              return (
                <div
                  key={m.data}
                  style={{
                    width: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: o,
                    transform: `scale(${s * (m.destaque ? 1.05 : 1)})`,
                  }}
                >
                  {/* Slot fixo de 64px para o ponto — garante que todos
                      os centros das bolinhas fiquem na mesma linha. */}
                  <div
                    style={{
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 32,
                    }}
                  >
                    <div
                      style={{
                        width: pontoSize,
                        height: pontoSize,
                        borderRadius: '50%',
                        background: colors.violeta,
                        border: `4px solid ${colors.bege}`,
                        boxShadow: m.destaque
                          ? `0 0 0 3px ${colors.violeta}, 0 0 28px rgba(96,44,102,0.6)`
                          : 'none',
                      }}
                    />
                  </div>
                <div
                  style={{
                    fontFamily: fonts.bebas,
                    fontSize: m.destaque ? 44 : 36,
                    color: colors.preto,
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                    marginBottom: 16,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.data}
                </div>
                <div
                  style={{
                    fontFamily: fonts.inter,
                    fontSize: 18,
                    color: colors.preto,
                    opacity: 0.7,
                    lineHeight: 1.4,
                    textAlign: 'center',
                    maxWidth: 240,
                  }}
                >
                  {m.desc}
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Métricas */}
        <div
          style={{
            display: 'flex',
            gap: 120,
            opacity: metricsOpacity,
            transform: `translateY(${metricsY}px)`,
          }}
        >
          {[
            { num: '21', label: 'BREAKEVEN' },
            { num: '37', label: 'PAYBACK' },
          ].map((it) => (
            <div
              key={it.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.bebas,
                  fontSize: 140,
                  color: colors.violeta,
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                }}
              >
                {it.num}{' '}
                <span style={{ fontSize: 60, color: colors.preto, opacity: 0.7 }}>
                  MESES
                </span>
              </div>
              <div
                style={{
                  fontFamily: fonts.dm,
                  fontSize: 22,
                  color: colors.preto,
                  letterSpacing: '0.28em',
                  fontWeight: 500,
                  opacity: 0.7,
                }}
              >
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </AbsoluteFill>
  );
};

// Bloco 4: Tattoo Week SP em destaque (420 frames, 7s).
// Padrão similar à FrenteSubScene mas com mais elementos de texto e
// gradiente fixo do lado esquerdo (texto à esquerda).
//   0-30    vídeo fade-in vindo da direita (translateX 80→0)
//   30-60   gradiente escuro à esquerda
//   60-90   "NOV 2027" entra (slide da esquerda + fade)
//   90-150  "TATTOO WEEK SP" entra
//   150-210 descritor entra
//   210-270 frase complementar entra
//   270-360 estável
//   360-420 fade-out global
const Bloco4TattooWeek: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1380;
  if (!active) return null;

  const videoOpacityIn = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const videoTranslateX = interpolate(localFrame, [0, 30], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const fadeOutAll = interpolate(localFrame, [360, 420], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const videoOpacity = Math.min(videoOpacityIn, fadeOutAll);

  const gradientOpacity = Math.min(
    interpolate(localFrame, [30, 60], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );

  const enterFrom = -60;

  const dataOpacity = Math.min(
    interpolate(localFrame, [60, 90], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const dataTranslate = interpolate(localFrame, [60, 90], [enterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const tituloOpacity = Math.min(
    interpolate(localFrame, [90, 150], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const tituloTranslate = interpolate(localFrame, [90, 150], [enterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const descOpacity = Math.min(
    interpolate(localFrame, [150, 210], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const descTranslate = interpolate(localFrame, [150, 210], [enterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const fraseOpacity = Math.min(
    interpolate(localFrame, [210, 270], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const fraseTranslate = interpolate(localFrame, [210, 270], [enterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  return (
    <AbsoluteFill>
      {/* Vídeo de fundo */}
      <AbsoluteFill
        style={{
          opacity: videoOpacity,
          transform: `translateX(${videoTranslateX}px)`,
        }}
      >
        <OffthreadVideo
          src={staticFile('assets/tattoo_week.mp4')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          muted
        />
      </AbsoluteFill>

      {/* Gradiente preto reforçando o lado esquerdo */}
      <AbsoluteFill
        style={{
          opacity: gradientOpacity,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Texto à esquerda */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '7%',
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 120,
            color: colors.violeta,
            letterSpacing: '0.04em',
            lineHeight: 1,
            opacity: dataOpacity,
            transform: `translateX(${dataTranslate}px)`,
          }}
        >
          NOV 2027
        </div>
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 156,
            color: colors.gelo,
            letterSpacing: '0.03em',
            lineHeight: 0.95,
            opacity: tituloOpacity,
            transform: `translateX(${tituloTranslate}px)`,
          }}
        >
          TATTOO WEEK SP
        </div>
        <div
          style={{
            fontFamily: fonts.inter,
            fontWeight: 300,
            fontSize: 30,
            color: colors.gelo,
            opacity: descOpacity * 0.92,
            lineHeight: 1.5,
            maxWidth: 720,
            transform: `translateX(${descTranslate}px)`,
            marginTop: 8,
          }}
        >
          O maior evento de tatuagem do mundo.
        </div>
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 44,
            color: colors.bege,
            letterSpacing: '0.05em',
            lineHeight: 1.1,
            opacity: fraseOpacity,
            transform: `translateX(${fraseTranslate}px)`,
            marginTop: 12,
          }}
        >
          É lá que entramos em escala.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene07Tracao: React.FC = () => {
  const frame = useCurrentFrame();

  const activeBloco1 = frame < 480;
  const activeBloco2 = frame >= 480 && frame < 960;
  const activeBloco3 = frame >= 960 && frame < 1380;
  const activeBloco4 = frame >= 1380;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bege }}>
      {activeBloco1 && <Bloco1Parceiros active={activeBloco1} />}
      {activeBloco2 && (
        <Sequence from={480} durationInFrames={480} layout="none">
          <Bloco2Gtm active={activeBloco2} />
        </Sequence>
      )}
      {activeBloco3 && <Bloco3Roadmap active={activeBloco3} />}
      {activeBloco4 && <Bloco4TattooWeek active={activeBloco4} />}
    </AbsoluteFill>
  );
};
