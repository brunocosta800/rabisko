import { Composition } from 'remotion';
import { RabiskoComposition } from './Composition';
import { FPS, TOTAL_FRAMES } from './tokens';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Rabisko"
      component={RabiskoComposition}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
