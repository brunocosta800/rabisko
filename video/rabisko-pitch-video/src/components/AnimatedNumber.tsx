import { interpolate, useCurrentFrame } from 'remotion';
import { easeIn } from '../styles/easings';

interface AnimatedNumberProps {
  from?: number;
  to: number;
  durationInFrames: number;
  startFrame?: number;
  suffix?: string;
  prefix?: string;
  format?: (n: number) => string;
  style?: React.CSSProperties;
}

const defaultFormat = (n: number) => Math.round(n).toString();

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  from = 0,
  to,
  durationInFrames,
  startFrame = 0,
  prefix = '',
  suffix = '',
  format = defaultFormat,
  style,
}) => {
  const frame = useCurrentFrame();
  const value = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [from, to],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeIn,
    }
  );
  return (
    <span style={style}>
      {prefix}
      {format(value)}
      {suffix}
    </span>
  );
};
