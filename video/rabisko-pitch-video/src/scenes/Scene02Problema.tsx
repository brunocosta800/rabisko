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
import { AnimatedNumber } from '../components/AnimatedNumber';
import { FonteCitation } from '../components/FonteCitation';

loadBebas();
loadInter();
loadDM();

// Cena 2 ocupa frames 1800-4620 (absolutos). Dentro da Sequence o
// useCurrentFrame() devolve frames relativos (0-2820).
//
// Sub-blocos (frames relativos):
//   Bloco A — 0-600    "97%" + subtitle + Fonte: Sebrae
//   Bloco B — 600-1800 silhueta + 5 ferramentas + "5 OU 6 FERRAMENTAS"
//                      (frase visível ~13s antes do fade-out em 1740-1800)
//   Bloco C — 1800-2820 "275 MIL" + subtitle + Fonte: PrePly + complemento

// Logos baixados em public/assets/logos/ (CC0, simpleicons.org).
// Renderizamos via mask + background-color para tonalizar em violeta
// e manter coerência com a paleta do brandbook.
const FERRAMENTAS = [
  { src: 'instagram.svg',     label: 'INSTAGRAM' },
  { src: 'whatsapp.svg',      label: 'WHATSAPP' },
  { src: 'googlecalendar.svg', label: 'AGENDA' },
  { src: 'excel.svg',         label: 'PLANILHA' },
  { src: 'pix.svg',           label: 'PIX' },
] as const;

const TintedSvg: React.FC<{ assetPath: string; size: number; color: string }> = ({
  assetPath,
  size,
  color,
}) => {
  const url = staticFile(assetPath);
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url(${url})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: `url(${url})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
    />
  );
};

const FerramentaOrbital: React.FC<{
  src: string;
  label: string;
  x: number;
  y: number;
  delayFrames: number;
}> = ({ src, label, x, y, delayFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [960 + delayFrames, 960 + delayFrames + 18],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  const scale = interpolate(
    frame,
    [960 + delayFrames, 960 + delayFrames + 18],
    [0.7, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          border: `1.5px solid ${colors.violeta}`,
          background: 'rgba(96, 44, 102, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TintedSvg assetPath={`assets/logos/${src}`} size={50} color={colors.violeta} />
      </div>
      <span
        style={{
          fontFamily: fonts.dm,
          fontSize: 14,
          fontWeight: 500,
          color: colors.preto,
          letterSpacing: '0.22em',
          opacity: 0.7,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const Scene02Problema: React.FC = () => {
  const frame = useCurrentFrame();

  // Bg transição: preto (0) → gelo (120) → gelo (1800) → bege (1920)
  const bgProgress1 = interpolate(frame, [0, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const bgProgress2 = interpolate(frame, [1980, 2100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  // Mistura preto→gelo→bege via 3 camadas
  const bgGeloOpacity = bgProgress1;
  const bgBegeOpacity = bgProgress2;

  // ---- Bloco A: 97% (0-600) ----
  const blocoAOpacityIn = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const blocoAOpacityOut = interpolate(frame, [800, 860], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const blocoAOpacity = Math.min(blocoAOpacityIn, blocoAOpacityOut);

  const subtitleAOpacity = interpolate(frame, [300, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Bloco B: silhueta + ferramentas (960-1800, +4s a mais para acomodar Bloco A esticado) ----
  const blocoBOpacityIn = interpolate(frame, [960, 1040], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const blocoBOpacityOut = interpolate(frame, [1920, 1980], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const blocoBOpacity = Math.min(blocoBOpacityIn, blocoBOpacityOut);

  // Frase "5 OU 6 FERRAMENTAS" entra no frame 1260 pela direita
  const fraseFerramentasOpacity = interpolate(
    frame,
    [1260, 1340],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  const fraseFerramentasX = interpolate(
    frame,
    [1260, 1380],
    [120, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  // ---- Bloco C: 275 mil (entra depois do admin sair em 54.5s) ----
  const blocoCOpacityIn = interpolate(frame, [2010, 2130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const blocoCOpacity = blocoCOpacityIn;

  const subtitleCOpacity = interpolate(frame, [2070, 2130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // Vídeo de remoção de tatuagem entra junto com o Bloco C
  const videoBgOpacity = interpolate(frame, [1980, 2100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Transição "fade-to-black" entre admin e Bloco C ----
  // 1920-1950 escurece totalmente (junto com fade-out do admin),
  // 1950-2070 abre revelando o vídeo do Bloco C
  const transitionOpacity = (() => {
    const inOp = interpolate(frame, [1920, 1950], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    });
    const outOp = interpolate(frame, [1950, 2070], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    });
    return Math.min(inOp, outOp);
  })();

  // ---- Punchline "Administrando" (entra no segundo 49 = local frame 1590) ----
  // 1590-1650 imagem cai de cima + backdrop entra
  // 1620-1680 texto faz fade-in
  // 1740-1800 tudo faz fade-out junto com a saída do Bloco B
  const adminBackdropOpacity = (() => {
    const inOp = interpolate(frame, [1590, 1620], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    });
    const outOp = interpolate(frame, [1920, 1980], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    });
    return Math.min(inOp, outOp);
  })();
  const adminImageY = interpolate(frame, [1590, 1680], [-1080, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const adminImageOpacity = (() => {
    const inOp = interpolate(frame, [1590, 1620], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    });
    const outOp = interpolate(frame, [1920, 1980], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    });
    return Math.min(inOp, outOp);
  })();
  const adminTextOpacity = (() => {
    const inOp = interpolate(frame, [1620, 1680], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    });
    const outOp = interpolate(frame, [1920, 1980], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    });
    return Math.min(inOp, outOp);
  })();
  const adminTextY = interpolate(frame, [1620, 1680], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  return (
    <AbsoluteFill>
      {/* Camadas de fundo */}
      <AbsoluteFill style={{ backgroundColor: colors.preto }} />
      <AbsoluteFill
        style={{ backgroundColor: colors.gelo, opacity: bgGeloOpacity }}
      />
      <AbsoluteFill
        style={{ backgroundColor: colors.bege, opacity: bgBegeOpacity }}
      />

      {/* ---- Vídeo de fundo do Bloco A (sozinho.mp4) ---- */}
      <AbsoluteFill style={{ opacity: blocoAOpacity }}>
        <OffthreadVideo
          src={staticFile('assets/sozinho.mp4')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          muted
        />
        {/* Filtro escuro para legibilidade do texto */}
        <AbsoluteFill
          style={{ backgroundColor: colors.preto, opacity: 0.55 }}
        />
      </AbsoluteFill>

      {/* ---- Bloco A: 97% + texto alinhados à esquerda ---- */}
      <AbsoluteFill style={{ opacity: blocoAOpacity }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '7%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            gap: 28,
            maxWidth: '55%',
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 340,
              color: colors.gelo,
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
            }}
          >
            <AnimatedNumber
              from={0}
              to={97}
              durationInFrames={180}
              startFrame={60}
              suffix="%"
            />
          </div>
          <div
            style={{
              opacity: subtitleAOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 18,
            }}
          >
            <div
              style={{
                fontFamily: fonts.inter,
                fontSize: 40,
                color: colors.gelo,
                opacity: 0.92,
                maxWidth: 1100,
                lineHeight: 1.3,
                textAlign: 'left',
              }}
            >
              dos novos estúdios de tatuagem abertos em 2022 foram MEIs
            </div>
            <FonteCitation
              text="FONTE: SEBRAE, 2023"
              color={colors.gelo}
              fontSize={18}
              opacity={0.6}
            />
          </div>
        </div>
      </AbsoluteFill>

      {/* ---- Bloco B: silhueta + 5 ferramentas + "5 OU 6 FERRAMENTAS" ---- */}
      <AbsoluteFill style={{ opacity: blocoBOpacity }}>
        {/* Silhueta + ferramentas orbitando à esquerda */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '32%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
          }}
        >
          {/* Linhas tracejadas conectando o centro às ferramentas */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.35,
            }}
            viewBox="0 0 700 700"
          >
            {[
              { x: 100, y: 90 },
              { x: 600, y: 130 },
              { x: 640, y: 480 },
              { x: 80, y: 510 },
              { x: 350, y: 640 },
            ].map((p, i) => (
              <line
                key={i}
                x1={350}
                y1={350}
                x2={p.x}
                y2={p.y}
                stroke={colors.violeta}
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
            ))}
            {/* linhas cruzadas entre ferramentas para sugerir caos */}
            {[
              [0, 2],
              [1, 3],
              [0, 4],
              [2, 3],
            ].map(([a, b], i) => {
              const pts = [
                { x: 100, y: 90 },
                { x: 600, y: 130 },
                { x: 640, y: 480 },
                { x: 80, y: 510 },
                { x: 350, y: 640 },
              ];
              return (
                <line
                  key={`cross-${i}`}
                  x1={pts[a].x}
                  y1={pts[a].y}
                  x2={pts[b].x}
                  y2={pts[b].y}
                  stroke={colors.violeta}
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  opacity={0.5}
                />
              );
            })}
          </svg>

          {/* Foto do tatuador no centro */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 180,
              height: 180,
              borderRadius: '50%',
              border: `2px solid ${colors.preto}`,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Img
              src={staticFile('assets/foto_tatuador.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Ferramentas */}
          {[
            { x: 100, y: 90 },
            { x: 600, y: 130 },
            { x: 640, y: 480 },
            { x: 80, y: 510 },
            { x: 350, y: 640 },
          ].map((p, i) => (
            <FerramentaOrbital
              key={i}
              src={FERRAMENTAS[i].src}
              label={FERRAMENTAS[i].label}
              x={p.x}
              y={p.y}
              delayFrames={60 + i * 24}
            />
          ))}
        </div>

        {/* Frase "5 OU 6 FERRAMENTAS" à direita */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 100,
            transform: `translate(${fraseFerramentasX}px, -50%)`,
            opacity: fraseFerramentasOpacity,
            width: 720,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 96,
              color: colors.preto,
              lineHeight: 0.95,
              letterSpacing: '0.02em',
            }}
          >
            5 OU 6
            <br />
            <span style={{ color: colors.violeta }}>FERRAMENTAS.</span>
          </div>
          <div
            style={{
              fontFamily: fonts.inter,
              fontWeight: 300,
              fontSize: 32,
              color: colors.preto,
              opacity: 0.75,
              marginTop: 24,
              lineHeight: 1.35,
            }}
          >
            Nenhuma conversa entre si.
          </div>
        </div>
      </AbsoluteFill>

      {/* ---- Punchline "Administrando" (segundo 49 = local 1590-1800) ---- */}
      {frame >= 1590 && frame < 1980 && (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {/* Imagem como plano de fundo full-bleed caindo de cima */}
          <AbsoluteFill
            style={{
              opacity: adminImageOpacity,
              transform: `translateY(${adminImageY}px)`,
            }}
          >
            <Img
              src={staticFile('assets/administrando.jpg')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Filtro escuro para legibilidade do texto */}
            <AbsoluteFill
              style={{
                backgroundColor: colors.preto,
                opacity: adminBackdropOpacity * 0.55,
              }}
            />
          </AbsoluteFill>

          {/* Texto centralizado no meio */}
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              opacity: adminTextOpacity,
              transform: `translateY(${adminTextY}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.bebas,
                fontSize: 140,
                color: colors.gelo,
                letterSpacing: '0.03em',
                lineHeight: 0.98,
                textAlign: 'center',
                maxWidth: '82%',
              }}
            >
              PASSA MAIS TEMPO{' '}
              <span style={{ color: colors.violeta }}>ADMINISTRANDO</span>
              <br />
              AO INVÉS DE TATUAR.
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      )}

      {/* ---- Transição fade-to-black entre admin e Bloco C ---- */}
      {frame >= 1920 && frame < 2070 && (
        <AbsoluteFill
          style={{
            backgroundColor: colors.preto,
            opacity: transitionOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ---- Vídeo de remoção de tatuagem (fundo do Bloco C) ---- */}
      <Sequence from={1980}>
        <AbsoluteFill style={{ opacity: videoBgOpacity }}>
          <OffthreadVideo
            src={staticFile('assets/remocao_tatuagem.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            muted
          />
          {/* Filtro escuro para legibilidade do texto */}
          <AbsoluteFill style={{ backgroundColor: colors.preto, opacity: 0.55 }} />
        </AbsoluteFill>
      </Sequence>

      {/* ---- Bloco C: 275 MIL ---- */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: blocoCOpacity,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 24,
            width: '85%',
          }}
        >
          <div
            style={{
              fontFamily: fonts.bebas,
              fontSize: 260,
              color: colors.gelo,
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
            }}
          >
            275 MIL
          </div>
          <div
            style={{
              opacity: subtitleCOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                fontFamily: fonts.inter,
                fontSize: 36,
                color: colors.gelo,
                opacity: 0.9,
                lineHeight: 1.3,
                maxWidth: 1100,
              }}
            >
              brasileiros pesquisaram remoção de tatuagem em 6 meses
            </div>
            <FonteCitation
              text="FONTE: PREPLY, 2024"
              color={colors.gelo}
              fontSize={18}
              opacity={0.6}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
