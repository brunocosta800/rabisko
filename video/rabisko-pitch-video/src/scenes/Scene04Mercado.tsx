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
import { BrazilMap } from '../components/BrazilMap';

loadBebas();
loadInter();
loadDM();

// Cena 4 ocupa frames 6870-8850 (absolutos, 1980 frames / 33s).
// Beats:
//   0-1020       mapa + dots + +150 MIL + R$ 2,5 BI
//   1050-1290    foto mexendo_celular (filtro escuro) — 2:12-2:16
//   1290-1980    vídeo gerenciando_celular (filtro preto) + frase "O TATUADOR DE 2026..."

// Pontos posicionados em % do container do mapa.
// region: 'N' = norte, 'NE' = nordeste, 'CW' = centro-oeste,
//         'SE' = sudeste, 'S' = sul, 'SP' = cluster são paulo.
const DOTS = [
  // Norte (6)
  { x: 22, y: 20, region: 'N' },
  { x: 28, y: 28, region: 'N' },
  { x: 36, y: 22, region: 'N' },
  { x: 30, y: 33, region: 'N' },
  { x: 42, y: 30, region: 'N' },
  { x: 48, y: 24, region: 'N' },
  // Nordeste (8)
  { x: 60, y: 30, region: 'NE' },
  { x: 67, y: 32, region: 'NE' },
  { x: 72, y: 38, region: 'NE' },
  { x: 76, y: 44, region: 'NE' },
  { x: 70, y: 48, region: 'NE' },
  { x: 64, y: 42, region: 'NE' },
  { x: 78, y: 52, region: 'NE' },
  { x: 72, y: 56, region: 'NE' },
  // Centro-Oeste (5)
  { x: 42, y: 50, region: 'CW' },
  { x: 50, y: 55, region: 'CW' },
  { x: 46, y: 62, region: 'CW' },
  { x: 38, y: 58, region: 'CW' },
  { x: 54, y: 62, region: 'CW' },
  // Sudeste fora de SP (5)
  { x: 60, y: 65, region: 'SE' },
  { x: 66, y: 68, region: 'SE' },
  { x: 70, y: 70, region: 'SE' },
  { x: 64, y: 60, region: 'SE' },
  { x: 58, y: 68, region: 'SE' },
  // Cluster SP intensificado (8)
  { x: 54, y: 70, region: 'SP' },
  { x: 56, y: 72, region: 'SP' },
  { x: 58, y: 71, region: 'SP' },
  { x: 60, y: 73, region: 'SP' },
  { x: 55, y: 74, region: 'SP' },
  { x: 57, y: 75, region: 'SP' },
  { x: 59, y: 76, region: 'SP' },
  { x: 53, y: 73, region: 'SP' },
  // Sul (4)
  { x: 48, y: 82, region: 'S' },
  { x: 52, y: 86, region: 'S' },
  { x: 45, y: 92, region: 'S' },
  { x: 50, y: 90, region: 'S' },
];

const Dot: React.FC<{
  x: number;
  y: number;
  region: string;
  index: number;
}> = ({ x, y, region, index }) => {
  const frame = useCurrentFrame();
  // Aparição com stagger ao longo do Beat 1 (frames 60-420)
  const appearStart = 60 + index * 9;
  const opacityIn = interpolate(
    frame,
    [appearStart, appearStart + 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  const scaleIn = interpolate(
    frame,
    [appearStart, appearStart + 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  // Some em 2:11.5 (local 1020), antes da foto entrar
  const fadeOut = interpolate(frame, [1020, 1110], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const opacity = opacityIn * fadeOut;
  const size = region === 'SP' ? 12 : 8;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: colors.violeta,
        borderRadius: '50%',
        opacity,
        transform: `scale(${scaleIn})`,
        boxShadow: `0 0 ${region === 'SP' ? 14 : 6}px rgba(96, 44, 102, ${
          region === 'SP' ? 0.9 : 0.6
        })`,
      }}
    />
  );
};

export const Scene04Mercado: React.FC = () => {
  const frame = useCurrentFrame();

  // ===== MAPA — desliza levemente p/ esquerda no início, some em 2:11.5 =====
  const mapaTranslateX = interpolate(
    frame,
    [0, 120],
    [0, -8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  const mapaOpacity = interpolate(frame, [1020, 1110], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  // ===== BLOCO +150 MIL — entra desde o início, encolhe quando R$ 2,5 BI entra =====
  const bloco150OpacityIn = interpolate(frame, [0, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  // Some em 2:11.5 (local 1020) — antes da foto mexendo_celular entrar
  const bloco150OpacityOut = interpolate(frame, [1020, 1110], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const bloco150Opacity = Math.min(bloco150OpacityIn, bloco150OpacityOut);
  const bloco150TranslateX = interpolate(frame, [0, 120], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  // Encolhe pra dar espaço ao R$ 2,5 BI (entra em 1:59 = local frame 270)
  const bloco150Scale = interpolate(frame, [210, 330], [1, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const bloco150ShiftY = interpolate(frame, [210, 330], [0, -220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ===== BLOCO R$ 2,5 BI — entra em 1:59 (local frame 270) =====
  const blocoBiOpacityIn = interpolate(frame, [270, 390], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  // Some em 2:11.5 (local 1020)
  const blocoBiOpacityOut = interpolate(frame, [1020, 1110], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const blocoBiOpacity = Math.min(blocoBiOpacityIn, blocoBiOpacityOut);
  const blocoBiTranslateX = interpolate(frame, [270, 390], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const pillOpacity = interpolate(frame, [370, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // R$ 2,5 BI encolhe quando o 48% entra (600 → 720)
  const biFontSize = interpolate(frame, [600, 720], [240, 150], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const biPrefixSize = interpolate(frame, [600, 720], [120, 75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const biSuffixSize = interpolate(frame, [600, 720], [100, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ===== BLOCO 48% CNPJ — entra em 2:05.5 (mesmo padrão do R$ 2,5 BI) =====
  const cnpjOpacity = Math.min(
    interpolate(frame, [660, 780], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    interpolate(frame, [1020, 1110], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );
  const cnpjTranslateX = interpolate(frame, [660, 780], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ===== FOTO mexendo_celular (2:12-2:16, local 1050-1290) =====
  const mexendoOpacity = Math.min(
    interpolate(frame, [1050, 1110], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    interpolate(frame, [1260, 1320], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );

  // ===== VÍDEO gerenciando_celular (2:16 → fim, local 1290-1980) =====
  const gerenciandoOpacity = interpolate(frame, [1290, 1380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ===== FRASE FINAL "O TATUADOR DE 2026..." (sobre o gerenciando) =====
  const fraseTimingOpacity = Math.min(
    interpolate(frame, [1440, 1560], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    interpolate(frame, [1920, 1980], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );
  const fraseTimingY = interpolate(frame, [1440, 1560], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.azul }}>
      {/* Container do mapa — translate base + zoom adicional */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '32%',
          width: '50%',
          height: '92%',
          transform: `translate(-50%, -50%) translate(${mapaTranslateX}%, 0%)`,
          opacity: mapaOpacity,
        }}
      >
        <BrazilMap width="100%" height="100%" strokeOpacity={0.55} />
      </div>

      {/* Painel direito — contém os 3 blocos sobrepostos */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '46%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Bloco +150 MIL */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '8%',
            right: '6%',
            transform: `translate(${bloco150TranslateX}px, calc(-50% + ${bloco150ShiftY}px)) scale(${bloco150Scale})`,
            transformOrigin: 'left top',
            opacity: bloco150Opacity,
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 200,
              color: colors.gelo,
              lineHeight: 0.9,
              letterSpacing: '0.01em',
            }}
          >
            <span style={{ color: colors.bege }}>+</span>150 MIL
          </div>
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 48,
              color: colors.bege,
              letterSpacing: '0.18em',
              marginTop: 10,
            }}
          >
            ESTÚDIOS
          </div>
          <div
            style={{
              fontFamily: fonts.inter,
              fontWeight: 300,
              fontSize: 24,
              color: colors.gelo,
              opacity: 0.75,
              marginTop: 24,
              maxWidth: 600,
              lineHeight: 1.4,
            }}
          >
            estúdios de tatuagem ativos em todo o território nacional
          </div>
        </div>

        {/* Bloco R$ 2,5 BI */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '8%',
            right: '6%',
            transform: `translate(${blocoBiTranslateX}px, -50%)`,
            opacity: blocoBiOpacity,
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: biFontSize,
              color: colors.gelo,
              lineHeight: 0.9,
              letterSpacing: '0.01em',
            }}
          >
            <span style={{ color: colors.bege, fontSize: biPrefixSize }}>R$ </span>
            2,5
            <span style={{ color: colors.bege, fontSize: biSuffixSize }}> BI</span>
          </div>
          <div
            style={{
              fontFamily: fonts.inter,
              fontWeight: 300,
              fontSize: 22,
              color: colors.gelo,
              opacity: 0.75,
              marginTop: 16,
              maxWidth: 580,
              lineHeight: 1.4,
            }}
          >
            foi o que o mercado de tatuagem movimentou em 2024.
          </div>
          {/* Pill de crescimento */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 28,
              padding: '12px 20px',
              border: `1px solid rgba(234, 224, 213, 0.35)`,
              background: 'rgba(234, 224, 213, 0.12)',
              borderRadius: 999,
              fontFamily: fonts.dm,
              fontSize: 18,
              color: colors.bege,
              letterSpacing: '0.18em',
              fontWeight: 500,
              opacity: pillOpacity,
            }}
          >
            <span style={{ fontSize: 22 }}>↗</span>
            CRESCENDO +15% AO ANO
          </div>
        </div>

        {/* Bloco 48% CNPJ MEI — entra em 2:05.5 (local frame 660) */}
        <div
          style={{
            position: 'absolute',
            bottom: 90,
            left: '8%',
            right: '6%',
            opacity: cnpjOpacity,
            transform: `translateX(${cnpjTranslateX}px)`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 240,
              color: colors.gelo,
              lineHeight: 0.85,
              letterSpacing: '-0.01em',
            }}
          >
            48<span style={{ fontSize: 110 }}>%</span>
          </div>
          <div
            style={{
              fontFamily: fonts.inter,
              fontWeight: 300,
              fontSize: 28,
              color: colors.gelo,
              opacity: 0.85,
              marginTop: -4,
              maxWidth: 620,
              lineHeight: 1.4,
            }}
          >
            dos CNPJ de São Paulo são MEI's
          </div>
        </div>

      </div>

      {/* Fundo preto cobre o azul antes/durante/entre os vídeos —
          garante que a transição entre mexendo_celular e gerenciando_celular
          não revele o azul de fundo. */}
      <AbsoluteFill
        style={{
          backgroundColor: colors.preto,
          opacity: interpolate(frame, [1020, 1110], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: easeIn,
          }),
        }}
      />

      {/* Foto mexendo_celular (2:12-2:16) com filtro escuro */}
      {frame >= 1050 && frame < 1320 && (
        <AbsoluteFill style={{ opacity: mexendoOpacity }}>
          <Img
            src={staticFile('assets/mexendo_celular.jpg')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <AbsoluteFill style={{ backgroundColor: 'rgba(0, 0, 0, 0.78)' }} />

          {/* Texto sobre a foto — "FAZENDO TUDO PELO CELULAR" */}
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              opacity: Math.min(
                interpolate(frame, [1080, 1170], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: easeIn,
                }),
                interpolate(frame, [1260, 1320], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: easeOut,
                })
              ),
              transform: `translateY(${interpolate(
                frame,
                [1080, 1170],
                [24, 0],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: easeIn,
                }
              )}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.bebas,
                fontSize: 150,
                color: colors.gelo,
                letterSpacing: '0.03em',
                lineHeight: 0.95,
                textAlign: 'center',
                maxWidth: '82%',
              }}
            >
              FAZENDO <span style={{ color: colors.violeta }}>TUDO</span>
              <br />
              PELO CELULAR
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      )}

      {/* Vídeo gerenciando_celular (2:16 → fim) com filtro preto.
          Vídeo nativo dura 8.1s, cena precisa de 11.5s — playbackRate 0.705
          estica naturalmente sem loop visível. */}
      {frame >= 1290 && (
        <AbsoluteFill style={{ opacity: gerenciandoOpacity }}>
          <Sequence from={1290} layout="none">
            <AbsoluteFill>
              <OffthreadVideo
                src={staticFile('assets/gerenciando_celular.mp4')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                playbackRate={0.705}
                muted
              />
            </AbsoluteFill>
          </Sequence>
          <AbsoluteFill style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} />
        </AbsoluteFill>
      )}

      {/* Frase final — sobre o gerenciando_celular */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fraseTimingOpacity,
          transform: `translateY(${fraseTimingY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 120,
            color: colors.gelo,
            textAlign: 'center',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            width: '90%',
          }}
        >
          O TATUADOR DE 2026 NÃO QUER MAIS
          <br />
          <span style={{ color: colors.bege }}>SEIS ABAS ABERTAS.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
