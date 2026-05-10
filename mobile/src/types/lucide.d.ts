import 'lucide-react-native';

declare module 'lucide-react-native' {
  import { SvgProps } from 'react-native-svg';
  import { ForwardRefExoticComponent } from 'react';

  export interface LucideProps extends SvgProps {
    size?: number | string;
    color?: string;
    stroke?: string;
    fill?: string;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = ForwardRefExoticComponent<LucideProps>;
}
