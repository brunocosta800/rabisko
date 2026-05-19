import {
  AbsoluteFill,
  Img,
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
import { Logo } from '../components/Logo';

loadBebas();
loadInter();
loadDM();

// Cena 3 ocupa 2520 frames absolutos (cena3 em tokens.ts). useCurrentFrame() devolve 0-2520.
// Sub-blocos:
//   A 0-300    — polvo pequeno + "O SISTEMA OPERACIONAL DO TATUADOR." centralizado
//   B 300-1200 — título sobe para o topo + 3 pilares (stagger 30f)
//   C 1200-2100 — pilares saem, 3 sub-cenas full-bleed (Estúdios / Tatuadores / Clientes)
//                 com vídeo/imagem de fundo + gradiente + texto, 300 frames cada.
//   D 2180-2520 — frase de fechamento "UNIDOS EM UMA SÓ PLATAFORMA."

const PILARES = [
  {
    titulo: 'VITRINE PÚBLICA',
    desc: 'Descoberta de artistas por estilo, técnica e localização.',
  },
  {
    titulo: 'SIMULAÇÃO NO CORPO',
    desc: 'IA que mostra como a tatuagem fica antes do procedimento.',
  },
  {
    titulo: 'FLUXO INTEGRADO',
    desc: 'Da descoberta ao pós-procedimento em um único app.',
  },
];

type Media = { type: 'video' | 'image'; src: string };

const PILARES_MERCADO: ReadonlyArray<{
  num: string;
  titulo: string;
  stat: string;
  desc: string;
  media: Media;
  side: 'left' | 'right';
}> = [
  {
    num: '01',
    titulo: 'ESTÚDIOS',
    stat: 'R$ 50 mil/mês',
    desc: '10 tatuadores compartilhados, faturamento médio mensal.',
    media: { type: 'image', src: 'assets/estudio.webp' },
    side: 'left',
  },
  {
    num: '02',
    titulo: 'TATUADORES',
    stat: '30 TRABALHOS/MÊS',
    desc: 'Independentes que precisam gerenciar agenda, captação e cobrança.',
    media: { type: 'video', src: 'assets/tatuador.mp4' },
    side: 'right',
  },
  {
    num: '03',
    titulo: 'CLIENTES',
    stat: 'INSEGURANÇA',
    desc: 'Querem tatuar mas não sabem como o resultado vai ficar.',
    media: { type: 'image', src: 'assets/cliente.jpg' },
    side: 'left',
  },
];

// Sub-cena full-bleed de UM pilar do mercado. Dura 300 frames (5s).
// Mesmo padrão das sub-cenas de GTM da Cena 7:
//   0-30    mídia entra com fade-in vindo da direita
//   30-60   gradiente preto reforça o lado do texto
//   60-90   número "0X" entra (slide do lado correspondente + fade)
//   90-150  título entra
//   150-210 stat + descrição entram juntos
//   210-270 estável
//   270-300 fade-out global
const PilarSubScene: React.FC<{
  num: string;
  titulo: string;
  stat: string;
  desc: string;
  media: Media;
  side: 'left' | 'right';
}> = ({ num, titulo, stat, desc, media, side }) => {
  const localFrame = useCurrentFrame();

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

  const fadeOutAll = interpolate(localFrame, [225, 255], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const mediaOpacity = Math.min(videoOpacityIn, fadeOutAll);

  const gradientOpacity = Math.min(
    interpolate(localFrame, [30, 60], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );

  const textEnterFrom = side === 'left' ? -60 : 60;

  const numOpacity = Math.min(
    interpolate(localFrame, [60, 90], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const numTranslate = interpolate(localFrame, [60, 90], [textEnterFrom, 0], {
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
  const tituloTranslate = interpolate(
    localFrame,
    [90, 150],
    [textEnterFrom, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  const descOpacity = Math.min(
    interpolate(localFrame, [150, 210], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const descTranslate = interpolate(
    localFrame,
    [150, 210],
    [textEnterFrom, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  const gradientDirection = side === 'left' ? 'to right' : 'to left';

  return (
    <AbsoluteFill>
      {/* Mídia de fundo */}
      <AbsoluteFill
        style={{
          opacity: mediaOpacity,
          transform: `translateX(${videoTranslateX}px)`,
        }}
      >
        {media.type === 'video' ? (
          <OffthreadVideo
            src={staticFile(media.src)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
          />
        ) : (
          <Img
            src={staticFile(media.src)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </AbsoluteFill>

      {/* Gradiente preto reforçando o lado do texto */}
      <AbsoluteFill
        style={{
          opacity: gradientOpacity,
          background: `linear-gradient(${gradientDirection}, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)`,
        }}
      />

      {/* Bloco de texto no canto superior do lado correspondente */}
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
            fontSize: 140,
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
            opacity: descOpacity,
            transform: `translateX(${descTranslate}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: side === 'left' ? 'flex-start' : 'flex-end',
            gap: 12,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 44,
              color: colors.bege,
              letterSpacing: '0.05em',
              lineHeight: 1,
            }}
          >
            {stat}
          </div>
          <div
            style={{
              fontFamily: fonts.inter,
              fontWeight: 300,
              fontSize: 26,
              color: colors.gelo,
              opacity: 0.9,
              lineHeight: 1.5,
              maxWidth: 640,
              textAlign: side === 'left' ? 'left' : 'right',
            }}
          >
            {desc}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

interface FadeBlockProps {
  inFrame: number;
  inDuration?: number;
  outFrame?: number;
  outDuration?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  translateY?: number;
}

const FadeBlock: React.FC<FadeBlockProps> = ({
  inFrame,
  inDuration = 30,
  outFrame,
  outDuration = 30,
  children,
  style,
  translateY = 18,
}) => {
  const frame = useCurrentFrame();
  const opacityIn = interpolate(
    frame,
    [inFrame, inFrame + inDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  const opacityOut =
    outFrame !== undefined
      ? interpolate(frame, [outFrame, outFrame + outDuration], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: easeOut,
        })
      : 1;
  const opacity = Math.min(opacityIn, opacityOut);
  const ty = interpolate(
    frame,
    [inFrame, inFrame + inDuration],
    [translateY, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  return (
    <div style={{ ...style, opacity, transform: `translateY(${ty}px)` }}>
      {children}
    </div>
  );
};

export const Scene03Solucao: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Bloco A: título centralizado ----
  const tituloOpacityIn = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // O título migra do centro para o topo nos frames 300-360
  const tituloProgress = interpolate(frame, [300, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // Mistura: posição vertical do título (50% no início, ~14% no final)
  // e tamanho da fonte (96px → 56px)
  const tituloTop = `${50 - tituloProgress * 36}%`;
  const tituloFontSize = 96 - tituloProgress * 40;

  // O Logo polvo central some quando o título migra
  const logoCentralOpacity = interpolate(
    frame,
    [0, 60, 280, 340],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  // Título recua de novo durante o Bloco C (perfis)
  const tituloOpacityOut = interpolate(frame, [1500, 1560], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  // Bloco D: frase final, esconder título também
  const tituloOpacity =
    Math.min(tituloOpacityIn, tituloOpacityOut) * 1;

  // ---- Bloco B: 3 pilares (entrada 360, saída 1200) ----
  const pilarOpacityOut = interpolate(frame, [1500, 1560], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  // ---- Bloco C: 3 sub-cenas de pilares (1500-2400, deslocado +5s) ----
  const blocoCActive = frame >= 1500 && frame < 2400;

  // ---- Bloco D: frase final (adiantada 1.5s para encostar no fim do Bloco C) ----
  const fraseFinalOpacity = interpolate(frame, [2310, 2410], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const fraseFinalY = interpolate(frame, [2310, 2410], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* Logo polvo pequeno acima do título no Bloco A */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '36%',
          transform: 'translate(-50%, -100%)',
          opacity: logoCentralOpacity,
        }}
      >
        <Logo
          polvoSize={80}
          marcaSize={0}
          variant="light"
          direction="column"
          showMarca={false}
        />
      </div>

      {/* Título — migra do centro pro topo */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: tituloTop,
          transform: 'translate(-50%, -50%)',
          fontFamily: fonts.bebas,
          fontSize: tituloFontSize,
          color: colors.gelo,
          letterSpacing: '0.03em',
          textAlign: 'center',
          lineHeight: 1,
          opacity: tituloOpacity,
          width: '90%',
        }}
      >
        O SISTEMA OPERACIONAL DO TATUADOR.
      </div>

      {/* ---- Bloco B: 3 pilares ---- */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 120,
          opacity: pilarOpacityOut,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 32,
            width: '88%',
            maxWidth: 1700,
            justifyContent: 'center',
          }}
        >
          {PILARES.map((p, i) => (
            <FadeBlock
              key={p.titulo}
              inFrame={360 + i * 15}
              inDuration={20}
              translateY={24}
              style={{
                flex: 1,
                border: `1px solid ${colors.violeta}`,
                background: 'rgba(96, 44, 102, 0.08)',
                padding: '52px 40px',
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 24,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.bebas,
                  fontSize: 44,
                  color: colors.gelo,
                  letterSpacing: '0.05em',
                  lineHeight: 1,
                }}
              >
                {p.titulo}
              </div>
              <div
                style={{
                  fontFamily: fonts.inter,
                  fontSize: 22,
                  color: colors.gelo,
                  opacity: 0.85,
                  lineHeight: 1.45,
                  fontWeight: 300,
                }}
              >
                {p.desc}
              </div>
            </FadeBlock>
          ))}
        </div>
      </AbsoluteFill>

      {/* ---- Bloco C: 3 sub-cenas full-bleed dos pilares do mercado ---- */}
      {blocoCActive && (
        <Sequence from={1500} durationInFrames={900} layout="none">
          <AbsoluteFill>
            {PILARES_MERCADO.map((p, i) => (
              <Sequence
                key={p.num}
                from={i * 255}
                durationInFrames={255}
                layout="none"
              >
                <PilarSubScene
                  num={p.num}
                  titulo={p.titulo}
                  stat={p.stat}
                  desc={p.desc}
                  media={p.media}
                  side={p.side}
                />
              </Sequence>
            ))}
          </AbsoluteFill>
        </Sequence>
      )}

      {/* ---- Bloco D: frase final ---- */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fraseFinalOpacity,
          transform: `translateY(${fraseFinalY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 140,
            color: colors.gelo,
            textAlign: 'center',
            letterSpacing: '0.03em',
            lineHeight: 0.95,
          }}
        >
          UNIDOS EM UMA{' '}
          <span style={{ color: colors.violeta }}>SÓ</span> PLATAFORMA.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
