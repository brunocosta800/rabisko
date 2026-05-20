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

// Cena 9 ocupa 660 frames (11s). useCurrentFrame() devolve 0-660.
// Áudio Fechamento.m4a ≈ 10.4s.
// 3 beats:
//   Beat 1 BILHÕES   0-220    bg preto→violeta + "A TATUAGEM MOVE BILHÕES."
//   Beat 2 TATUAGEM  220-440  segunda linha "A GENTE MOVE A TATUAGEM."
//   Beat 3 LOGO      440-660  linhas sobem/encolhem + polvo + RABISKO + slogan

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

  // ---- Background: preto → violeta nos primeiros 132 frames (2.2s) ----
  const bgT = interpolate(frame, [0, 132], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const bgColor = mixColor(colors.preto, colors.violeta, bgT);

  // ---- Linha 1: entra 0-60 (Beat 1, 0s) ----
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

  // ---- Linha 2: entra 150-210 ----
  const linha2OpacityIn = interpolate(frame, [150, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const linha2Y = interpolate(frame, [150, 210], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Beat 3: linhas sobem + encolhem (240-320) ----
  const frasesScale = interpolate(frame, [240, 320], [1, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const frasesTranslateY = interpolate(frame, [240, 320], [0, -380], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Logo (polvo + marca) entra 280-340 ----
  const logoOpacity = interpolate(frame, [280, 340], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const logoScale = interpolate(frame, [280, 340], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Slogan "VEM MUDAR A VIDA COM APENAS UM RABISKO" — sync em 5:15 (frame 390) ----
  const sloganOpacity = interpolate(frame, [330, 390], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const sloganTracking = interpolate(frame, [330, 390], [0.05, 0.25], {
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
            VEM MUDAR A VIDA COM APENAS UM RABISKO.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
