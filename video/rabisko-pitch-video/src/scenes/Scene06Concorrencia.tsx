import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadBebas } from '@remotion/google-fonts/BebasNeue';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { colors, fonts } from '../tokens';
import { easeIn, easeOut } from '../styles/easings';
import { Logo } from '../components/Logo';

loadBebas();
loadInter();
loadDM();

// Cena 6 ocupa frames 12600-15000 (2400 frames). useCurrentFrame() devolve 0-2400.
// Blocos:
//   A 0-240    título "POSICIONAMENTO COMPETITIVO"
//   B 240-1500 tabela 4 cols x (header + 6 linhas) com stagger de 36f
//   C 1500-2400 frase "3 EIXOS QUE NENHUM CONCORRENTE OCUPA."

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

  // ---- Bloco A: título ----
  const tituloOpacityIn = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const tituloOpacityOut = interpolate(frame, [1500, 1560], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const tituloOpacity = Math.min(tituloOpacityIn, tituloOpacityOut);

  // ---- Bloco B: tabela ----
  const tabelaOpacityIn = interpolate(frame, [180, 280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const tabelaOpacityOut = interpolate(frame, [1500, 1620], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const tabelaOpacity = Math.min(tabelaOpacityIn, tabelaOpacityOut);

  // ---- Bloco C: frase final ----
  const fraseOpacity = interpolate(frame, [1620, 1740], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const fraseY = interpolate(frame, [1620, 1740], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const HEADER_START = 240;
  const ROW_START = 360;
  const ROW_STAGGER = 36;

  const cols = '2fr 1fr 1fr 1fr';
  const rowPadding = '24px 28px';

  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* Título */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: tituloOpacity,
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

      {/* Frase final */}
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
            fontSize: 140,
            color: colors.gelo,
            textAlign: 'center',
            lineHeight: 0.95,
            letterSpacing: '0.03em',
            width: '90%',
          }}
        >
          <span
            style={{
              color: colors.violeta,
              fontSize: 280,
              display: 'block',
              lineHeight: 1,
              marginBottom: 12,
            }}
          >
            3
          </span>
          EIXOS QUE NENHUM CONCORRENTE OCUPA.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
