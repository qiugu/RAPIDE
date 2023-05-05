import { CSSProperties, HTMLProps } from "react";
import { Size, Type, Status, Shape } from '../global';

export interface BaseButtonProps {
  style?: CSSProperties;
  className?: string | string[];
  size?: Size;
  type?: Type;
  status?: Status;
  shape?: Shape;
  href?: string;
  target?: string;
  anchorProps: HTMLProps<HTMLAnchorElement>;
  disable?: boolean;
  loading?: boolean;
  long?: boolean;
  onClick?: (e: Event) => void;
}
