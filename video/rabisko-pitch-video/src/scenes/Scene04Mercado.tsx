import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { colors, fonts } from '../tokens';
import { easeIn, easeOut } from '../styles/easings';
import { BrazilMap } from '../components/BrazilMap';
import { FonteCitation } from '../components/FonteCitation';

loadBebas();
loadInter();
loadDM();

// Cena 4 ocupa frames 7200-9900 (absolutos). useCurrentFrame() devolve 0-2700.
// 5 Beats:
//   Beat 1 ABERTURA       0-480    label + mapa centrado + pontos com stagger
//   Beat 2 +150 MIL       480-1080  mapa desliza p/ esquerda + painel direito
//   Beat 3 R$ 2,5 BI      1080-1680 "+150 MIL" encolhe pro topo + R$ 2,5 BI + pill
//   Beat 4 ZOOM SP        1680-2400 zoom 2.4x em SP + "2.219" + Fonte: Sebrae
//   Beat 5 TIMING         2400-2700 mapa some + frase "SEIS ABAS ABERTAS"

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
  // Periféricos (não-SP) fade para 0.2 durante Beat 3
  const peripheralFade =
    region === 'SP'
      ? 1
      : interpolate(frame, [1140, 1260], [1, 0.2], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: easeOut,
        });
  // SP intensifica durante Beat 4 (escala e brilho)
  const spIntensify =
    region === 'SP'
      ? interpolate(frame, [1700, 1820], [1, 1.5], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: easeIn,
        })
      : 1;
  // Tudo desaparece no Beat 5
  const beat5Fade = interpolate(frame, [2400, 2460], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const opacity = opacityIn * peripheralFade * beat5Fade;
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
        transform: `scale(${scaleIn * spIntensify})`,
        boxShadow: `0 0 ${region === 'SP' ? 14 : 6}px rgba(96, 44, 102, ${
          region === 'SP' ? 0.9 : 0.6
        })`,
      }}
    />
  );
};

export const Scene04Mercado: React.FC = () => {
  const frame = useCurrentFrame();

  // ===== MAPA — translate e scale por beat =====
  // Beat 1 (0-480): centralizado, scale 1
  // Beat 2 (480-600): desliza esquerda translateX -22%
  // Beat 4 (1680-1820): zoom 2.4x com origem em SP
  // Beat 5 (2400-2520): fade-out

  const mapaTranslateX = interpolate(
    frame,
    [480, 600],
    [0, -22],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  const mapaScale = interpolate(
    frame,
    [1680, 1820],
    [1, 2.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  // No zoom, queremos focar em SP que está a ~58%, 73% do container.
  // Para deslocar o foco para o quadrante esquerdo da viewport (já que o
  // painel à direita está visível), aplicamos translate adicional.
  const mapaZoomTranslateX = interpolate(
    frame,
    [1680, 1820],
    [0, -15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  const mapaZoomTranslateY = interpolate(
    frame,
    [1680, 1820],
    [0, -18],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  const mapaOpacity = interpolate(frame, [2400, 2520], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  // ===== BLOCO +150 MIL — entra Beat 2, encolhe no Beat 3 =====
  const bloco150OpacityIn = interpolate(frame, [540, 640], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  // Some quando o Beat 4 (São Paulo) inicia
  const bloco150OpacityOut = interpolate(frame, [1680, 1800], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const bloco150Opacity = Math.min(bloco150OpacityIn, bloco150OpacityOut);
  const bloco150TranslateX = interpolate(frame, [540, 660], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  // No Beat 3 encolhe para 0.55 e sobe pra parte superior do painel
  const bloco150Scale = interpolate(frame, [1080, 1200], [1, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const bloco150ShiftY = interpolate(frame, [1080, 1200], [0, -220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ===== BLOCO R$ 2,5 BI — entra Beat 3 =====
  const blocoBiOpacityIn = interpolate(frame, [1140, 1260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  // Some quando o Beat 4 (São Paulo) inicia
  const blocoBiOpacityOut = interpolate(frame, [1680, 1800], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const blocoBiOpacity = Math.min(blocoBiOpacityIn, blocoBiOpacityOut);
  const blocoBiTranslateX = interpolate(frame, [1140, 1260], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const pillOpacity = interpolate(frame, [1240, 1320], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ===== BLOCO SP — entra Beat 4 =====
  const blocoSpOpacityIn = interpolate(frame, [1820, 1940], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const blocoSpOpacityOut = interpolate(frame, [2380, 2460], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const blocoSpOpacity = Math.min(blocoSpOpacityIn, blocoSpOpacityOut);
  const blocoSpTranslateY = interpolate(frame, [1820, 1940], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ===== FRASE TIMING (Beat 5) =====
  const fraseTimingOpacity = interpolate(frame, [2460, 2560], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const fraseTimingY = interpolate(frame, [2460, 2560], [20, 0], {
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
          left: '50%',
          width: '36%',
          height: '70%',
          transform: `translate(-50%, -50%) translate(${mapaTranslateX}%, 0%) translate(${mapaZoomTranslateX}%, ${mapaZoomTranslateY}%) scale(${mapaScale})`,
          transformOrigin: '58% 73%',
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
              fontSize: 240,
              color: colors.gelo,
              lineHeight: 0.9,
              letterSpacing: '0.01em',
            }}
          >
            <span style={{ color: colors.bege, fontSize: 120 }}>R$ </span>
            2,5
            <span style={{ color: colors.bege, fontSize: 100 }}> BI</span>
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

        {/* Bloco SP / 2.219 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '8%',
            right: '6%',
            transform: `translate(0, calc(-50% + ${blocoSpTranslateY}px))`,
            opacity: blocoSpOpacity,
          }}
        >
          <div
            style={{
              fontFamily: fonts.dm,
              fontSize: 20,
              color: colors.bege,
              letterSpacing: '0.3em',
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            SÃO PAULO
          </div>
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 200,
              color: colors.gelo,
              lineHeight: 0.9,
              letterSpacing: '0.01em',
            }}
          >
            2.219
          </div>
          <div
            style={{
              fontFamily: fonts.inter,
              fontWeight: 300,
              fontSize: 24,
              color: colors.gelo,
              opacity: 0.75,
              marginTop: 20,
              maxWidth: 600,
              lineHeight: 1.4,
            }}
          >
            novos estúdios abertos só na capital em 2022.
          </div>
          <div style={{ marginTop: 24 }}>
            <FonteCitation
              text="FONTE: SEBRAE"
              color={colors.bege}
              opacity={0.55}
              fontSize={16}
            />
          </div>
        </div>
      </div>

      {/* Frase final — Beat 5 */}
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
