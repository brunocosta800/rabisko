import {
  AbsoluteFill,
  Audio,
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

// Cena dura 1350 frames (22.5s @ 60fps), alinhada com a narração Hook.m4a
// (21.6s, "Chegou a hora..." em 17.5s).
const SCENE_END = 1350;
const DARKEN_START = 1000;               // ~16.7s — começa a escurecer um pouco antes da frase
const DARKEN_END = 1140;                 // ~19s — totalmente escuro
const PHRASE_FADE_IN_START = 1020;       // 17s — frase começa a aparecer
const PHRASE_FADE_IN_END = 1170;         // 19.5s — frase visível
const PHRASE_FADE_OUT_START = SCENE_END - 60;  // 21.5s
const PHRASE_FADE_OUT_END = SCENE_END;         // 22.5s

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const darkenOpacity = interpolate(
    frame,
    [DARKEN_START, DARKEN_END],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  const phraseOpacityIn = interpolate(
    frame,
    [PHRASE_FADE_IN_START, PHRASE_FADE_IN_END],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );
  const phraseOpacityOut = interpolate(
    frame,
    [PHRASE_FADE_OUT_START, PHRASE_FADE_OUT_END],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut }
  );
  const phraseOpacity = Math.min(phraseOpacityIn, phraseOpacityOut);
  const phraseTranslateY = interpolate(
    frame,
    [PHRASE_FADE_IN_START, PHRASE_FADE_IN_END],
    [24, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* Trilha de batimento cardíaco — termina ~30f antes da batida final
          (fade-out nos últimos 30f pra evitar corte abrupto). */}
      <Sequence from={0} durationInFrames={PHRASE_FADE_OUT_START - 30}>
        <Audio
          src={staticFile('assets/audio/cena1_heartbeat.mp3')}
          volume={(f) =>
            interpolate(
              f,
              [PHRASE_FADE_OUT_START - 60, PHRASE_FADE_OUT_START - 30],
              [0.55, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
          }
        />
      </Sequence>
      {/* Batida final mais alta — entra junto com o fade-out da frase
          ("CHEGOU A HORA … ACOMPANHAR A AGULHA"), pontuando o fim da cena. */}
      <Sequence from={PHRASE_FADE_OUT_START} durationInFrames={17}>
        <Audio
          src={staticFile('assets/audio/cena1_final_beat.mp3')}
          volume={1}
        />
      </Sequence>

      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile('assets/video_cena_1.mp4')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          muted
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          backgroundColor: colors.preto,
          opacity: 0.35,
        }}
      />

      <AbsoluteFill
        style={{
          backgroundColor: colors.preto,
          opacity: darkenOpacity,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: phraseOpacity,
          transform: `translateY(${phraseTranslateY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.bebas,
            color: colors.gelo,
            textAlign: 'center',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            width: '90%',
          }}
        >
          <div style={{ fontSize: 110 }}>CHEGOU A HORA</div>
          <div style={{ fontSize: 110 }}>DESSA EVOLUÇÃO</div>
          <div
            style={{
              fontSize: 170,
              color: colors.gelo,
              marginTop: 24,
              letterSpacing: '0.04em',
            }}
          >
            ACOMPANHAR A <span style={{ color: colors.violeta }}>AGULHA</span>.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
