import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { colors, fonts } from '../tokens';
import { easeIn, easeOut } from '../styles/easings';

loadBebas();
loadInter();
loadDM();

// Cena 5 ocupa frames 9900-12600. useCurrentFrame() devolve 0-2700.
// Blocos:
//   A 0-300    título "3 FORMAS DE GANHAR DINHEIRO"
//   B 300-1800 3 cards horizontais (stagger 60f)
//   C 1800-2700 cards comprimem pra cima + frase final "A GENTE CRESCE COM O MERCADO."

const CARDS = [
  {
    num: '01',
    titulo: 'MENSALIDADE',
    desc: 'Tatuadores e estúdios pagam pela plataforma.',
    valor: 'R$ 400 a R$ 600 por mês',
  },
  {
    num: '02',
    titulo: 'IMPULSO DE PERFIL',
    desc: 'Artistas pagam para aparecer mais na vitrine.',
    valor: 'Pacotes semanais',
  },
  {
    num: '03',
    titulo: 'TAXA SOBRE O SINAL',
    desc: 'Pequena taxa em cada pagamento via Pix.',
    valor: 'A cada sessão fechada',
  },
];

const ENTRY_FRAMES = 36;
const STAGGER = 36; // ~600ms a 60fps (mais ágil para caber em 2100 frames)

export const Scene05Receita: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Título — entra no início, some no Beat C ----
  const tituloOpacityIn = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const tituloOpacityOut = interpolate(frame, [1100, 1200], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const tituloOpacity = Math.min(tituloOpacityIn, tituloOpacityOut);
  const tituloY = interpolate(frame, [0, 60], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Cards — somem no Beat C (sem shrink/translate, só fade) ----
  const cardsOpacityOut = interpolate(frame, [1100, 1200], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  // ---- Frase final — entra após título e cards sumirem ----
  const fraseOpacity = interpolate(frame, [1220, 1340], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const fraseY = interpolate(frame, [1220, 1340], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gelo }}>
      {/* Título no topo */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: tituloOpacity,
          transform: `translateY(${tituloY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 96,
            color: colors.preto,
            letterSpacing: '0.03em',
            lineHeight: 1,
          }}
        >
          3 FORMAS DE GANHAR DINHEIRO
        </div>
      </div>

      {/* Cards horizontais */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: cardsOpacityOut,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 36,
            width: '88%',
            maxWidth: 1700,
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {CARDS.map((c, i) => {
            const cardStart = 300 + i * STAGGER;
            const opacity = interpolate(
              frame,
              [cardStart, cardStart + ENTRY_FRAMES],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: easeIn,
              }
            );
            const ty = interpolate(
              frame,
              [cardStart, cardStart + ENTRY_FRAMES],
              [28, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: easeIn,
              }
            );
            return (
              <div
                key={c.num}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '56px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  minHeight: 420,
                  opacity,
                  transform: `translateY(${ty}px)`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.bebas,
                    fontSize: 110,
                    color: colors.violeta,
                    lineHeight: 1,
                    letterSpacing: '0.02em',
                  }}
                >
                  {c.num}
                </div>
                <div
                  style={{
                    fontFamily: fonts.bebas,
                    fontSize: 52,
                    color: colors.preto,
                    letterSpacing: '0.04em',
                    lineHeight: 1.05,
                  }}
                >
                  {c.titulo}
                </div>
                <div
                  style={{
                    fontFamily: fonts.inter,
                    fontSize: 22,
                    color: colors.preto,
                    opacity: 0.75,
                    lineHeight: 1.45,
                    fontWeight: 400,
                    flex: 1,
                  }}
                >
                  {c.desc}
                </div>
                <div
                  style={{
                    fontFamily: fonts.dm,
                    fontSize: 24,
                    color: colors.violeta,
                    fontWeight: 500,
                    fontStyle: 'italic',
                    letterSpacing: '0.02em',
                    marginTop: 'auto',
                  }}
                >
                  {c.valor}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Frase de fechamento — centralizada após título e cards sumirem */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fraseOpacity,
          transform: `translateY(${fraseY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 110,
            color: colors.preto,
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          A GENTE CRESCE{' '}
          <span style={{ color: colors.violeta }}>COM O MERCADO.</span>
          <br />
          NÃO SÓ COM ASSINATURA.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
