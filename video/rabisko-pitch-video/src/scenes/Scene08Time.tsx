import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { colors, fonts } from '../tokens';
import { easeIn, easeOut } from '../styles/easings';

loadBebas();
loadInter();
loadDM();

// Cena 8 ocupa frames 16800-18300 (1500 frames). useCurrentFrame() devolve 0-1500.
// Blocos:
//   A 0-900    6 avatares + caption FECAP
//   B 900-1500 R$ 112.000 INVESTIMENTO INICIAL

const TEAM = [
  { iniciais: 'BD', papel: 'Product Owner / Back-end' },
  { iniciais: 'VT', papel: 'Scrum Master / Back-end' },
  { iniciais: 'JB', papel: 'UX / Front-end' },
  { iniciais: 'VB', papel: 'Back-end / Tests' },
  { iniciais: 'FM', papel: 'UX / Front-end' },
  { iniciais: 'AS', papel: 'Front-end' },
];

export const Scene08Time: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Bloco A: avatares ----
  const blocoAOpacityOut = interpolate(frame, [840, 920], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const captionOpacity = interpolate(frame, [240, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Bloco B: ask ----
  const askOpacityIn = interpolate(frame, [940, 1040], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const askScale = interpolate(frame, [940, 1080], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const askLabelOpacity = interpolate(frame, [1040, 1140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* ---- Bloco A ---- */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: blocoAOpacityOut,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 80,
            width: '92%',
          }}
        >
          {/* Avatares */}
          <div
            style={{
              display: 'flex',
              gap: 56,
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {TEAM.map((member, i) => {
              const start = 30 + i * 12;
              const opacity = interpolate(
                frame,
                [start, start + 30],
                [0, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: easeIn,
                }
              );
              const ty = interpolate(frame, [start, start + 30], [16, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: easeIn,
              });
              return (
                <div
                  key={member.iniciais + i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 24,
                    opacity,
                    transform: `translateY(${ty}px)`,
                    maxWidth: 200,
                  }}
                >
                  <div
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: '50%',
                      background: colors.violeta,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: fonts.bebas,
                      fontSize: 56,
                      color: colors.gelo,
                      letterSpacing: '0.04em',
                      boxShadow: '0 4px 24px rgba(96,44,102,0.35)',
                    }}
                  >
                    {member.iniciais}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.dm,
                      fontSize: 18,
                      color: colors.gelo,
                      opacity: 0.7,
                      textAlign: 'center',
                      lineHeight: 1.4,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {member.papel}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Caption FECAP */}
          <div
            style={{
              fontFamily: fonts.inter,
              fontWeight: 300,
              fontSize: 28,
              color: colors.gelo,
              opacity: captionOpacity * 0.85,
              textAlign: 'center',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
            }}
          >
            Ciência da Computação — FECAP · Suporte direto no app desde o dia 1
          </div>
        </div>
      </AbsoluteFill>

      {/* ---- Bloco B: Ask R$ 112.000 ---- */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: askOpacityIn,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 36,
            transform: `scale(${askScale})`,
            transformOrigin: 'center center',
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 280,
              color: colors.violeta,
              lineHeight: 0.9,
              letterSpacing: '0.01em',
            }}
          >
            R$ 112.000
          </div>
          <div
            style={{
              fontFamily: fonts.dm,
              fontSize: 36,
              color: colors.gelo,
              letterSpacing: '0.3em',
              fontWeight: 500,
              opacity: askLabelOpacity * 0.9,
            }}
          >
            INVESTIMENTO INICIAL
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
