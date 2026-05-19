import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { colors, fonts } from '../tokens';
import { easeIn } from '../styles/easings';
import { Logo } from '../components/Logo';

loadBebas();
loadInter();
loadDM();

// Cena 9 ocupa frames 18300-19200 (900 frames). useCurrentFrame() devolve 0-900.
// 3 beats:
//   Beat 1 BILHÕES   0-300    bg preto→violeta + "A TATUAGEM MOVE BILHÕES."
//   Beat 2 TATUAGEM  300-600  segunda linha "A GENTE MOVE A TATUAGEM."
//   Beat 3 LOGO      600-900  linhas sobem/encolhem + polvo + RABISKO + slogan

// Interpola entre 2 cores hex no espaço sRGB linear via mix simples.
const mixColor = (hex1: string, hex2: string, t: number) => {
  const c1 = [
    parseInt(hex1.slice(1, 3), 16),
    parseInt(hex1.slice(3, 5), 16),
    parseInt(hex1.slice(5, 7), 16),
  ];
  const c2 = [
    parseInt(hex2.slice(1, 3), 16),
    parseInt(hex2.slice(3, 5), 16),
    parseInt(hex2.slice(5, 7), 16),
  ];
  const out = c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
  return `rgb(${out[0]}, ${out[1]}, ${out[2]})`;
};

export const Scene09Fechamento: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Background: preto → violeta nos primeiros 180 frames ----
  const bgT = interpolate(frame, [0, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const bgColor = mixColor(colors.preto, colors.violeta, bgT);

  // ---- Linha 1: entra Beat 1 ----
  const linha1OpacityIn = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const linha1Y = interpolate(frame, [0, 60], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Linha 2: entra Beat 2 ----
  const linha2OpacityIn = interpolate(frame, [300, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const linha2Y = interpolate(frame, [300, 360], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Beat 3: linhas sobem + encolhem para 0.55, indo para o topo ----
  // Durante frames 600-720 o conjunto das linhas:
  //   - scale: 1 → 0.55
  //   - translateY: 0 → -380px (sobe para a parte superior)
  const frasesScale = interpolate(frame, [600, 720], [1, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const frasesTranslateY = interpolate(frame, [600, 720], [0, -380], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Logo (polvo + marca) entra Beat 3 ----
  const logoOpacity = interpolate(frame, [660, 780], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const logoScale = interpolate(frame, [660, 780], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Slogan: letter-spacing 0.05em → 0.25em em 60 frames ----
  const sloganOpacity = interpolate(frame, [780, 840], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const sloganTracking = interpolate(frame, [780, 840], [0.05, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Grupo das duas linhas — escala + sobe no Beat 3 */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${frasesTranslateY}px) scale(${frasesScale})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            textAlign: 'center',
            lineHeight: 1.05,
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 110,
              color: colors.gelo,
              letterSpacing: '0.03em',
              opacity: linha1OpacityIn,
              transform: `translateY(${linha1Y}px)`,
            }}
          >
            A TATUAGEM MOVE BILHÕES.
          </div>
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 150,
              color: colors.gelo,
              letterSpacing: '0.03em',
              opacity: linha2OpacityIn,
              transform: `translateY(${linha2Y}px)`,
            }}
          >
            A GENTE MOVE A TATUAGEM.
          </div>
        </div>
      </AbsoluteFill>

      {/* Logo + slogan — Beat 3 */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            transform: `scale(${logoScale})`,
            transformOrigin: 'center center',
          }}
        >
          <Logo
            polvoSize={180}
            marcaSize={140}
            variant="light"
            direction="row"
            gap={28}
            letterSpacing="0.08em"
          />
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 40,
              color: colors.bege,
              letterSpacing: `${sloganTracking}em`,
              opacity: sloganOpacity,
              textTransform: 'uppercase',
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            COM APENAS UM RABISKO.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
