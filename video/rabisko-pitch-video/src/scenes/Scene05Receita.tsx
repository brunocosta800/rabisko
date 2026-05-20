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

loadBebas();
loadInter();
loadDM();

// Cena 5 ocupa 1710 frames (28.5s).
// Estrutura (timestamps do Receita 2.m4a):
//   A 0-180     título "2 FORMAS DE RECEITA" centralizado (0-3s)
//   B 180-720   MENSALIDADE: vídeo mensalidade.mp4 + texto à esquerda (3-12s, 9s)
//   C 720-1140  IMPULSO: vídeo impulso_perfil.mp4 + texto à direita (12-19s, 7s)
//   D 1140-1710 frase final "MODELO QUE NOS DÁ PREVISIBILIDADE..." (19-28.5s, 9.5s)

const ReceitaSubScene: React.FC<{
  num: string;
  titulo: string;
  desc: string;
  valor: string;
  videoSrc: string;
  side: 'left' | 'right';
  durationInFrames: number;
}> = ({ num, titulo, desc, valor, videoSrc, side, durationInFrames }) => {
  const localFrame = useCurrentFrame();

  // Sub-beats:
  //   0-30                vídeo fade-in vindo da direita (translateX 80→0)
  //   30-60               gradiente preto sobre o lado do texto
  //   60-90               número "0X" entra
  //   90-150              título entra
  //   150-210             descrição entra
  //   210-270             valor entra
  //   270-(D-60)          estável
  //   (D-60)-D            fade-out geral
  const fadeOutStart = durationInFrames - 60;
  const fadeOutEnd = durationInFrames;

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

  const fadeOutAll = interpolate(localFrame, [fadeOutStart, fadeOutEnd], [1, 0], {
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
          background: `linear-gradient(${gradientDirection}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0) 100%)`,
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

  // ---- Bloco A: título "2 FORMAS DE RECEITA" (0-180, 3s) ----
  const tituloAOpacityIn = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const tituloAOpacityOut = interpolate(frame, [150, 210], [1, 0], {
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

  // ---- Bloco D: frase final (1140-1710, 9.5s) ----
  const fraseOpacityIn = interpolate(frame, [1140, 1230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });
  const fraseOpacityOut = interpolate(frame, [1680, 1710], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const fraseOpacity = Math.min(fraseOpacityIn, fraseOpacityOut);
  const fraseY = interpolate(frame, [1140, 1230], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeIn,
  });

  const activeMensalidade = frame >= 180 && frame < 720;
  const activeImpulso = frame >= 720 && frame < 1140;

  // Bisko Preto aparece só durante os beats text-only (A e D), oculto em B/C
  const biskoOpacity = Math.max(tituloAOpacity, fraseOpacity) * 0.2;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gelo }}>
      {/* Polvo Bisko gigante à direita, polvo cortado no meio da tela.
          Visível só durante Beats A e D (texto puro). */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translate(50%, -50%)',
          width: 1500,
          height: 1500,
          opacity: biskoOpacity,
          pointerEvents: 'none',
        }}
      >
        <Img
          src={staticFile('assets/bisko_preto.svg')}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* ---- Bloco A: título centralizado ---- */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: tituloAOpacity,
          transform: `translateY(${tituloAY}px)`,
          paddingRight: '12%',
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

      {/* ---- Bloco B: MENSALIDADE (vídeo + texto à esquerda, 9s) ---- */}
      {activeMensalidade && (
        <Sequence from={180} durationInFrames={540} layout="none">
          <ReceitaSubScene
            num="01"
            titulo="MENSALIDADE"
            desc="Tatuadores e estúdios pagam pela plataforma."
            valor="R$ 300 a R$ 500 por mês"
            videoSrc="assets/mensalidade.mp4"
            side="left"
            durationInFrames={540}
          />
        </Sequence>
      )}

      {/* ---- Bloco C: IMPULSO DE PERFIL (vídeo + texto à direita, 7s) ---- */}
      {activeImpulso && (
        <Sequence from={720} durationInFrames={420} layout="none">
          <ReceitaSubScene
            num="02"
            titulo="IMPULSO DE PERFIL"
            desc="Artistas pagam para aparecer mais na vitrine."
            valor="Pacotes semanais"
            videoSrc="assets/impulso_perfil.mp4"
            side="right"
            durationInFrames={420}
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
          paddingRight: '12%',
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
          MODELO QUE NOS DÁ{' '}
          <span style={{ color: colors.violeta }}>PREVISIBILIDADE</span>
          <br />
          E <span style={{ color: colors.violeta }}>ESCALA</span> COM
          ENGAJAMENTO.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
