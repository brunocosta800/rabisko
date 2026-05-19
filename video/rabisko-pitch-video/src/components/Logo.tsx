import { staticFile } from 'remotion';
import { colors, fonts } from '../tokens';

type LogoVariant = 'light' | 'dark';

interface LogoProps {
  polvoSize: number;
  marcaSize: number;
  variant?: LogoVariant;
  gap?: number;
  direction?: 'row' | 'column';
  letterSpacing?: string;
  showMarca?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  polvoSize,
  marcaSize,
  variant = 'light',
  gap = 16,
  direction = 'column',
  letterSpacing = '0.15em',
  showMarca = true,
}) => {
  const tint = variant === 'light' ? colors.gelo : colors.preto;
  const invertFilter =
    variant === 'light'
      ? 'brightness(0) invert(1)'
      : 'brightness(0) saturate(100%)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems: 'center',
        justifyContent: 'center',
        gap,
      }}
    >
      <img
        src={staticFile('assets/logo-polvo.svg')}
        alt=""
        style={{
          width: polvoSize,
          height: polvoSize,
          objectFit: 'contain',
          filter: invertFilter,
        }}
      />
      {showMarca && (
        <span
          style={{
            fontFamily: fonts.bebas,
            fontSize: marcaSize,
            letterSpacing,
            color: tint,
            lineHeight: 1,
          }}
        >
          RABISKO
        </span>
      )}
    </div>
  );
};
