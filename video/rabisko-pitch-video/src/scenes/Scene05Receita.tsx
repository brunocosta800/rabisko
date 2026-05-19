import {
  AbsoluteFill,
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

loadBebas();
loadInter();
loadDM();

// Cena 5 ocupa 1980 frames (33s, 2:27.5 → 3:00.5 absolutos).
// Estrutura:
//   A 0-210     título "2 FORMAS DE RECEITA" centralizado (até 2:31)
//   B 210-690   MENSALIDADE: vídeo mensalidade.mp4 + texto à esquerda (2:31-2:39)
//   C 690-1170  IMPULSO: vídeo impulso_perfil.mp4 + texto à direita (2:39-2:47)
//   D 1170-1650 frase final "A GENTE CRESCE COM O MERCADO..." (2:47-2:55, 8s)
//   resto: dwell até o fim em 3:00.5

const ReceitaSubScene: React.FC<{
  num: string;
  titulo: string;
  desc: string;
  valor: string;
  videoSrc: string;
  side: 'left' | 'right';
}> = ({ num, titulo, desc, valor, videoSrc, side }) => {
  const localFrame = useCurrentFrame();

  // Sub-beats (480 frames, 8s):
  //   0-30    vídeo fade-in vindo da direita (translateX 80→0)
  //   30-60   gradiente preto sobre o lado do texto
  //   60-90   número "0X" entra (slide do lado + fade)
  //   90-150  título entra
  //   150-210 descrição entra
  //   210-270 valor entra
  //   270-420 estável
  //   420-480 fade-out geral

  const videoOpacityIn = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const videoTranslateX = interpolate(localFrame, [0, 30], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const fadeOutAll = interpolate(localFrame, [420, 480], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const videoOpacity = Math.min(videoOpacityIn, fadeOutAll);

  const gradientOpacity = Math.min(
    interpolate(localFrame, [30, 60], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );

  const enterFrom = side === 'left' ? -60 : 60;

  const numOpacity = Math.min(
    interpolate(localFrame, [60, 90], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const numTranslate = interpolate(localFrame, [60, 90], [enterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const tituloOpacity = Math.min(
    interpolate(localFrame, [90, 150], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const tituloTranslate = interpolate(localFrame, [90, 150], [enterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const descOpacity = Math.min(
    interpolate(localFrame, [150, 210], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const descTranslate = interpolate(localFrame, [150, 210], [enterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const valorOpacity = Math.min(
    interpolate(localFrame, [210, 270], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }),
    fadeOutAll
  );
  const valorTranslate = interpolate(localFrame, [210, 270], [enterFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const gradientDirection = side === 'left' ? 'to right' : 'to left';

  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* Vídeo de fundo */}
      <AbsoluteFill
        style={{
          opacity: videoOpacity,
          transform: `translateX(${videoTranslateX}px)`,
        }}
      >
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          muted
        />
      </AbsoluteFill>

      {/* Gradiente preto reforçando o lado do texto */}
      <AbsoluteFill
        style={{
          opacity: gradientOpacity,
          background: `linear-gradient(${gradientDirection}, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)`,
        }}
      />

      {/* Bloco de texto no lado correspondente */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          ...(side === 'left' ? { left: '7%' } : { right: '7%' }),
          maxWidth: '50%',
          textAlign: side === 'left' ? 'left' : 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          alignItems: side === 'left' ? 'flex-start' : 'flex-end',
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 120,
            color: colors.violeta,
            letterSpacing: '0.04em',
            lineHeight: 1,
            opacity: numOpacity,
            transform: `translateX(${numTranslate}px)`,
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 140,
            color: colors.gelo,
            letterSpacing: '0.03em',
            lineHeight: 0.95,
            opacity: tituloOpacity,
            transform: `translateX(${tituloTranslate}px)`,
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            fontFamily: fonts.inter,
            fontWeight: 300,
            fontSize: 28,
            color: colors.gelo,
            opacity: descOpacity * 0.92,
            lineHeight: 1.5,
            maxWidth: 700,
            transform: `translateX(${descTranslate}px)`,
            marginTop: 8,
            textAlign: side === 'left' ? 'left' : 'right',
          }}
        >
          {desc}
        </div>
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 48,
            color: colors.bege,
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            opacity: valorOpacity,
            transform: `translateX(${valorTranslate}px)`,
            marginTop: 12,
          }}
        >
          {valor}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene05Receita: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Bloco A: título "2 FORMAS DE RECEITA" (0-240) ----
  const tituloAOpacityIn = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const tituloAOpacityOut = interpolate(frame, [210, 270], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const tituloAOpacity = Math.min(tituloAOpacityIn, tituloAOpacityOut);
  const tituloAY = interpolate(frame, [0, 60], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  // ---- Bloco D: frase final (1170-1650, 8s) ----
  const fraseOpacityIn = interpolate(frame, [1170, 1260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const fraseOpacityOut = interpolate(frame, [1620, 1650], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const fraseOpacity = Math.min(fraseOpacityIn, fraseOpacityOut);
  const fraseY = interpolate(frame, [1170, 1260], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const activeMensalidade = frame >= 210 && frame < 690;
  const activeImpulso = frame >= 690 && frame < 1170;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gelo }}>
      {/* ---- Bloco A: título centralizado ---- */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: tituloAOpacity,
          transform: `translateY(${tituloAY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            fontSize: 180,
            color: colors.preto,
            letterSpacing: '0.03em',
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          2 FORMAS DE{' '}
          <span style={{ color: colors.violeta }}>RECEITA</span>
        </div>
      </AbsoluteFill>

      {/* ---- Bloco B: MENSALIDADE (vídeo + texto à esquerda) ---- */}
      {activeMensalidade && (
        <Sequence from={210} durationInFrames={480} layout="none">
          <ReceitaSubScene
            num="01"
            titulo="MENSALIDADE"
            desc="Tatuadores e estúdios pagam pela plataforma."
            valor="R$ 400 a R$ 600 por mês"
            videoSrc="assets/mensalidade.mp4"
            side="left"
          />
        </Sequence>
      )}

      {/* ---- Bloco C: IMPULSO DE PERFIL (vídeo + texto à direita) ---- */}
      {activeImpulso && (
        <Sequence from={690} durationInFrames={480} layout="none">
          <ReceitaSubScene
            num="02"
            titulo="IMPULSO DE PERFIL"
            desc="Artistas pagam para aparecer mais na vitrine."
            valor="Pacotes semanais"
            videoSrc="assets/impulso_perfil.mp4"
            side="right"
          />
        </Sequence>
      )}

      {/* ---- Bloco D: frase final ---- */}
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
            textAlign: 'center',
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
