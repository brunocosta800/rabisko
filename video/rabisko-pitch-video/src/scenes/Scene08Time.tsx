import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { colors, fonts } from '../tokens';
import { easeIn, easeOut } from '../styles/easings';

loadBebas();
loadInter();
loadDM();

// Cena 8 ocupa 1560 frames (26s). useCurrentFrame() devolve 0-1560.
// Áudio Equipe.m4a ≈ 26s, investimento sincroniza em 16.5s.
// Blocos:
//   A 0-990     Slide integrantes (título à esquerda + grid 3x2 dos 6 membros)
//   B 990-1560  R$ 106.000 INVESTIMENTO PARA DESENVOLVIMENTO

const TEAM = [
  { iniciais: 'VT', nome: 'VITOR TOKUNAGA',    papel: 'Scrum Master & Desenvolvedor Back End' },
  { iniciais: 'VB', nome: 'VINICIUS BINDA',    papel: 'Desenvolvedor Back End' },
  { iniciais: 'AD', nome: 'ALESSANDER DUGARO', papel: 'Desenvolvedor Front End' },
  { iniciais: 'FM', nome: 'FELIPE MARTINS',    papel: 'Desenvolvedor UX & Front End' },
  { iniciais: 'JB', nome: 'JOÃO BARBOSA',      papel: 'Desenvolvedor UX & Front End' },
  { iniciais: 'BC', nome: 'BRUNO COSTA',       papel: 'Desenvolvedor Back End & Front End' },
] as const;

export const Scene08Time: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Bloco A: slide integrantes ----
  const blocoAOpacityIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const blocoAOpacityOut = interpolate(frame, [930, 990], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const blocoAOpacity = Math.min(blocoAOpacityIn, blocoAOpacityOut);

  // ---- Bloco B: ask (entra em 16.5s = frame 990) ----
  const askOpacityIn = interpolate(frame, [990, 1080], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const askScale = interpolate(frame, [990, 1110], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const askLabelOpacity = interpolate(frame, [1080, 1170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* Rodapé preto no fundo — some quando o investimento (Bloco B) entra */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 1 - askOpacityIn,
          pointerEvents: 'none',
        }}
      >
        <Img
          src={staticFile('assets/rodape_preto.svg')}
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* Polvo Bisko à direita — só durante o Bloco B (ask) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translate(50%, -50%)',
          width: 1500,
          height: 1500,
          opacity: askOpacityIn * 0.18,
          pointerEvents: 'none',
        }}
      >
        <Img
          src={staticFile('assets/bisko_branco.svg')}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* ---- Bloco A: Slide integrantes (título à esquerda + grid 3x2) ---- */}
      <AbsoluteFill
        style={{
          opacity: blocoAOpacity,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '6% 6%',
          gap: 80,
        }}
      >
        {/* Lado esquerdo: título + subtítulo */}
        <div
          style={{
            flex: '0 0 38%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 36,
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 110,
              color: colors.gelo,
              lineHeight: 0.95,
              letterSpacing: '0.01em',
            }}
          >
            PESSOAS QUE
            <br />
            MOVIMENTAM
            <br />
            <span style={{ color: colors.violeta }}>O ECOSSISTEMA</span>
          </div>
          <div
            style={{
              fontFamily: fonts.inter,
              fontWeight: 300,
              fontSize: 26,
              color: colors.gelo,
              opacity: 0.75,
              lineHeight: 1.5,
              maxWidth: 540,
            }}
          >
            Uma equipe unida por propósito, experiência e compromisso.
          </div>
        </div>

        {/* Lado direito: grid 3x2 dos 6 integrantes */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 48,
            alignContent: 'center',
            justifyItems: 'center',
          }}
        >
          {TEAM.map((member, i) => {
            const start = 30 + i * 15;
            const opacity = interpolate(frame, [start, start + 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: easeIn,
            });
            const ty = interpolate(frame, [start, start + 30], [20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: easeIn,
            });
            return (
              <div
                key={member.iniciais}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 18,
                  opacity,
                  transform: `translateY(${ty}px)`,
                  maxWidth: 240,
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: colors.violeta,
                    border: `3px solid rgba(248,249,250,0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: fonts.bebas,
                    fontSize: 64,
                    color: colors.gelo,
                    letterSpacing: '0.04em',
                    boxShadow: '0 6px 28px rgba(96,44,102,0.4)',
                  }}
                >
                  {member.iniciais}
                </div>
                <div
                  style={{
                    fontFamily: fonts.bebas,
                    fontSize: 28,
                    color: colors.gelo,
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                    lineHeight: 1.1,
                  }}
                >
                  {member.nome}
                </div>
                <div
                  style={{
                    fontFamily: fonts.inter,
                    fontWeight: 300,
                    fontSize: 16,
                    color: colors.gelo,
                    opacity: 0.65,
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
      </AbsoluteFill>

      {/* ---- Bloco B: Ask R$ 84.000 ---- */}
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
            R$ 106.000
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
            INVESTIMENTO PARA DESENVOLVIMENTO
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
