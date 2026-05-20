import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { colors, fonts } from '../tokens';
import { easeIn, easeOut } from '../styles/easings';
import { Logo } from '../components/Logo';

loadBebas();
loadInter();
loadDM();

// Cena 6 ocupa 3270 frames (54.5s). useCurrentFrame() devolve 0-3270.
// Blocos:
//   A 0-60       título "POSICIONAMENTO COMPETITIVO" entra
//   B 180-540    tabela 4 cols x (header + 5 linhas) com stagger
//   título/tabela fade-out em 870-930 (3:11.5 absoluto)
//   C 930-2610   simulacao_tatuagem.png full-bleed + "SIMULAÇÃO DE TATUAGEM"
//   D 2610-3270  mockup.png full-bleed + "MOBILE FIRST NATIVO"

type Cell = { kind: 'check' } | { kind: 'x' } | { kind: 'parcial' };

const ROWS: { feature: string; inker: Cell; gi: Cell; rabisko: Cell; destaque?: boolean }[] = [
  { feature: 'Gestão do tatuador',           inker: { kind: 'check' }, gi: { kind: 'check' },   rabisko: { kind: 'check' } },
  { feature: 'Captação de clientes',         inker: { kind: 'check' }, gi: { kind: 'parcial' }, rabisko: { kind: 'check' } },
  { feature: 'IA — referência artística',    inker: { kind: 'check' }, gi: { kind: 'x' },       rabisko: { kind: 'x' } },
  { feature: 'Simulação no corpo do cliente', inker: { kind: 'x' },     gi: { kind: 'x' },       rabisko: { kind: 'check' }, destaque: true },
  { feature: 'Mobile-first nativo',          inker: { kind: 'parcial' }, gi: { kind: 'x' },     rabisko: { kind: 'check' }, destaque: true },
];

const CheckMark: React.FC<{ size?: number; color: string }> = ({
  size = 28,
  color,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const renderCell = (cell: Cell) => {
  if (cell.kind === 'check') {
    return <CheckMark color={colors.violeta} size={36} />;
  }
  if (cell.kind === 'x') {
    return (
      <span
        style={{
          fontFamily: fonts.inter,
          fontSize: 28,
          color: 'rgba(248, 249, 250, 0.3)',
          fontWeight: 300,
        }}
      >
        —
      </span>
    );
  }
  return (
    <span
      style={{
        fontFamily: fonts.dm,
        fontSize: 18,
        color: 'rgba(248, 249, 250, 0.55)',
        fontStyle: 'italic',
      }}
    >
      parcial
    </span>
  );
};

export const Scene06Concorrencia: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Bloco A: título (entra centralizado 0-60, sobe pro topo em 180-260, sai em 870-930) ----
  const tituloOpacity = Math.min(
    interpolate(frame, [0, 60], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    interpolate(frame, [870, 930], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );
  // Translate de 420px (centralizado vertical) → 0 (top: 100, posição final).
  const tituloTranslateY = interpolate(frame, [180, 260], [420, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Bloco B: tabela (entra depois do título subir, 260-360) ----
  const tabelaOpacity = Math.min(
    interpolate(frame, [260, 360], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    interpolate(frame, [870, 930], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );

  // ---- Rodapé preto (visível durante os beats text-only, some quando a foto entra) ----
  const rodapeOpacity = Math.min(
    interpolate(frame, [0, 60], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    interpolate(frame, [870, 930], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );

  // ---- Bloco C: simulação de tatuagem (3:11.5 → 3:39.5, local 930-2610) ----
  const simulacaoOpacity = Math.min(
    interpolate(frame, [930, 1020], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    interpolate(frame, [2550, 2610], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );
  const simulacaoTranslateY = interpolate(frame, [930, 1050], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const simulacaoTextOpacity = Math.min(
    interpolate(frame, [1020, 1140], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    interpolate(frame, [2550, 2610], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );
  const simulacaoTextTranslateY = interpolate(frame, [1020, 1140], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Bloco D: mockup + "MOBILE FIRST NATIVO" (entra em 2610 = 3:39.5) ----
  const mockupOpacity = interpolate(frame, [2610, 2700], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const mockupTranslateY = interpolate(frame, [2610, 2730], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const mockupTextOpacity = interpolate(frame, [2700, 2820], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const mockupTextTranslateY = interpolate(frame, [2700, 2820], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const HEADER_START = 320;
  const ROW_START = 440;
  const ROW_STAGGER = 36;

  const cols = '2fr 1fr 1fr 1fr';
  const rowPadding = '24px 28px';

  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* Título — entra centralizado, depois sobe pra cima da tabela */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: tituloOpacity,
          transform: `translateY(${tituloTranslateY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 80,
            color: colors.gelo,
            letterSpacing: '0.06em',
            lineHeight: 1,
          }}
        >
          POSICIONAMENTO COMPETITIVO
        </div>
      </div>

      {/* Tabela */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 80,
          opacity: tabelaOpacity,
        }}
      >
        <div
          style={{
            width: '84%',
            maxWidth: 1640,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: cols,
              alignItems: 'center',
              padding: rowPadding,
              borderBottom: '2px solid rgba(248,249,250,0.25)',
              opacity: interpolate(
                frame,
                [HEADER_START, HEADER_START + 36],
                [0, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: easeIn,
                }
              ),
              transform: `translateY(${interpolate(
                frame,
                [HEADER_START, HEADER_START + 36],
                [16, 0],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: easeIn,
                }
              )}px)`,
            }}
          >
            <div />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 70,
              }}
            >
              <img
                src={staticFile('assets/logo-inker.png')}
                alt=""
                style={{
                  maxHeight: 70,
                  maxWidth: 180,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 70,
              }}
            >
              <img
                src={staticFile('assets/logo-gestaoink.png')}
                alt=""
                style={{
                  maxHeight: 70,
                  maxWidth: 200,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 70,
              }}
            >
              <Logo
                polvoSize={42}
                marcaSize={36}
                variant="light"
                direction="row"
                gap={14}
                letterSpacing="0.18em"
              />
            </div>
          </div>

          {/* Linhas */}
          {ROWS.map((row, i) => {
            const start = ROW_START + i * ROW_STAGGER;
            const rowOpacity = interpolate(frame, [start, start + 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: easeIn,
            });
            const rowY = interpolate(frame, [start, start + 30], [12, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: easeIn,
            });
            return (
              <div
                key={row.feature}
                style={{
                  display: 'grid',
                  gridTemplateColumns: cols,
                  alignItems: 'center',
                  padding: rowPadding,
                  borderBottom: '1px solid rgba(248,249,250,0.08)',
                  opacity: rowOpacity,
                  transform: `translateY(${rowY}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.inter,
                    fontSize: 24,
                    color: colors.gelo,
                    fontWeight: row.destaque ? 500 : 400,
                    letterSpacing: '0.01em',
                  }}
                >
                  {row.feature}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {renderCell(row.inker)}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {renderCell(row.gi)}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {renderCell(row.rabisko)}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Rodapé preto — visível durante os beats text-only, some quando a foto entra */}
      {frame < 930 && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            opacity: rodapeOpacity,
            pointerEvents: 'none',
          }}
        >
          <Img
            src={staticFile('assets/rodape_preto.svg')}
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      )}

      {/* Bloco C: simulacao_tatuagem full-bleed + degradê + "SIMULAÇÃO DE TATUAGEM"
          (3:11.5 → 3:39.5) */}
      {frame >= 930 && frame < 2610 && (
        <AbsoluteFill>
          {/* Imagem de fundo full-bleed */}
          <AbsoluteFill
            style={{
              opacity: simulacaoOpacity,
              transform: `translateY(${simulacaoTranslateY}px)`,
            }}
          >
            <Img
              src={staticFile('assets/simulacao_tatuagem.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AbsoluteFill>

          {/* Degradê de baixo para cima */}
          <AbsoluteFill
            style={{
              opacity: simulacaoOpacity,
              background:
                'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 90%)',
            }}
          />

          {/* Texto centralizado na parte de baixo */}
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '8%',
              opacity: simulacaoTextOpacity,
              transform: `translateY(${simulacaoTextTranslateY}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.bebas,
                fontSize: 180,
                color: colors.gelo,
                lineHeight: 0.95,
                letterSpacing: '0.03em',
                textAlign: 'center',
              }}
            >
              SIMULAÇÃO DE{' '}
              <span style={{ color: colors.violeta }}>TATUAGEM</span>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      )}

      {/* Bloco D: mockup full-bleed + degradê + "MOBILE FIRST NATIVO"
          (3:39.5 → fim da cena) */}
      {frame >= 2610 && (
        <AbsoluteFill>
          {/* Imagem de fundo full-bleed */}
          <AbsoluteFill
            style={{
              opacity: mockupOpacity,
              transform: `translateY(${mockupTranslateY}px)`,
            }}
          >
            <Img
              src={staticFile('assets/mockup.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AbsoluteFill>

          {/* Degradê de baixo para cima (preto sólido na base, transparente no topo) */}
          <AbsoluteFill
            style={{
              opacity: mockupOpacity,
              background:
                'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 90%)',
            }}
          />

          {/* Texto centralizado na parte de baixo */}
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '8%',
              opacity: mockupTextOpacity,
              transform: `translateY(${mockupTextTranslateY}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.bebas,
                fontSize: 180,
                color: colors.gelo,
                lineHeight: 0.95,
                letterSpacing: '0.03em',
                textAlign: 'center',
              }}
            >
              MOBILE FIRST{' '}
              <span style={{ color: colors.violeta }}>NATIVO</span>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
