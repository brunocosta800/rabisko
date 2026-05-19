import { fonts } from '../tokens';

interface FonteCitationProps {
  text: string;
  color?: string;
  opacity?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}

export const FonteCitation: React.FC<FonteCitationProps> = ({
  text,
  color = '#000',
  opacity = 0.45,
  fontSize = 18,
  style,
}) => {
  return (
    <span
      style={{
        fontFamily: fonts.dm,
        fontSize,
        color,
        opacity,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {text}
    </span>
  );
};
