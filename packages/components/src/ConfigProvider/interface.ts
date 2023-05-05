import { ReactNode } from 'react';
import { Locale } from '../locale/interface';

export type ThemeConfig = Record<string, any>;

export interface ConfigProviderProps {
  size?: 'mini' | 'small' | 'default' | 'large';
  theme?: ThemeConfig;
  locale?: Locale;
  prefixCls?: string;
  getPrefixCls?: (componentName: string, customPrefix?: string) => string;
  getPopupContainer?: (node: HTMLElement) => Element;
  loadingElement?: ReactNode;
  renderEpmty?: () => ReactNode;
  children?: ReactNode;
}
