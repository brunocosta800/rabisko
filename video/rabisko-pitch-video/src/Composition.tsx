import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { sceneFrames } from './tokens';
import { Scene01Hook } from './scenes/Scene01Hook';
import { Scene02Problema } from './scenes/Scene02Problema';
import { Scene03Solucao } from './scenes/Scene03Solucao';
import { Scene04Mercado } from './scenes/Scene04Mercado';
import { Scene05Receita } from './scenes/Scene05Receita';
import { Scene06Concorrencia } from './scenes/Scene06Concorrencia';
import { Scene07Tracao } from './scenes/Scene07Tracao';
import { Scene08Time } from './scenes/Scene08Time';
import { Scene09Fechamento } from './scenes/Scene09Fechamento';

// Narração por cena. Os áudios começam com pequenos trechos de silêncio
// no próprio arquivo (ver timestamps no chat), então tocam do frame 0 da
// Sequence sem startFrom.
const narration = (file: string) =>
  staticFile(`assets/audio/${file}`);

export const RabiskoComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={sceneFrames.cena1.start} durationInFrames={sceneFrames.cena1.length}>
        <Scene01Hook />
        <Audio src={narration('Hook.m4a')} volume={6} />
      </Sequence>
      <Sequence from={sceneFrames.cena2.start} durationInFrames={sceneFrames.cena2.length}>
        <Scene02Problema />
        <Audio src={narration('Problema.m4a')} volume={6} />
      </Sequence>
      <Sequence from={sceneFrames.cena3.start} durationInFrames={sceneFrames.cena3.length}>
        <Scene03Solucao />
        <Audio src={narration('Solucao.m4a')} volume={6} />
      </Sequence>
      <Sequence from={sceneFrames.cena4.start} durationInFrames={sceneFrames.cena4.length}>
        <Scene04Mercado />
        <Audio src={narration('Mercado.m4a')} volume={6} />
      </Sequence>
      <Sequence from={sceneFrames.cena5.start} durationInFrames={sceneFrames.cena5.length}>
        <Scene05Receita />
        <Audio src={narration('Receita 2.m4a')} volume={6} />
      </Sequence>
      <Sequence from={sceneFrames.cena6.start} durationInFrames={sceneFrames.cena6.length}>
        <Scene06Concorrencia />
        <Audio src={narration('Concorrencia.m4a')} volume={6} />
      </Sequence>
      <Sequence from={sceneFrames.cena7.start} durationInFrames={sceneFrames.cena7.length}>
        <Scene07Tracao />
        <Audio src={narration('Parcerias.m4a')} volume={6} />
      </Sequence>
      <Sequence from={sceneFrames.cena8.start} durationInFrames={sceneFrames.cena8.length}>
        <Scene08Time />
        <Audio src={narration('Equipe.m4a')} volume={6} />
      </Sequence>
      <Sequence from={sceneFrames.cena9.start} durationInFrames={sceneFrames.cena9.length}>
        <Scene09Fechamento />
        <Audio src={narration('Fechamento.m4a')} volume={6} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Loader de fontes via @remotion/google-fonts ocorre nos arquivos das cenas que as usam,
// garantindo delayRender/continueRender por cena conforme a doc do Remotion.
export { useCurrentFrame };
