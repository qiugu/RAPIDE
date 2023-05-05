import React, { useEffect } from "react";
import { createContext } from "react";
import defaultLocale from "../locale/default";
import { isObject, omit } from "@rapide/utils";
import { ConfigProviderProps, ThemeConfig } from "./interface";

const colorList = {
  primaryColor: {
    default: "--arcoblue-6",
    hover: "--arcoblue-5",
    active: "--arcoblue-7",
  },
  successColor: {
    default: "--green-6",
    hover: "--green-5",
    active: "--green-7",
  },
  infoColor: {
    default: "--arcoblue-6",
    hover: "--arcoblue-5",
    active: "--arcoblue-7",
  },
  warningColor: {
    default: "--orangered-6",
    hover: "--orangered-5",
    active: "--orangered-7",
  },
  dangerColor: {
    default: "--red-6",
    hover: "--red-5",
    active: "--red-7",
  },
};

function setTheme(theme: ThemeConfig) {
  if (theme && isObject(theme)) {
    const root = document.body;

    Object.keys(colorList).forEach((color) => {
      root.style.setProperty(colorList[color].default, theme[color]);

      if (!theme[`${color}Hover`]) {
        root.style.setProperty(colorList[color].hover, theme[color]);
      }

      if (!theme[`${color}Active`]) {
        root.style.setProperty(colorList[color].active, theme[color]);
      }
    });
  }
}

const defaultProps: ConfigProviderProps = {
  size: "default",
  prefixCls: "ra",
  locale: defaultLocale,
  getPopupContainer: () => document.body,
};

export const ConfigContext = createContext<ConfigProviderProps>({
  getPrefixCls: (componentName: string, customPrefix?: string) =>
    `${customPrefix || "ra"}-${componentName}`,
  ...defaultProps,
});

function ConfigProvider(props: ConfigProviderProps) {
  const { children, prefixCls, theme } = props;

  function getPrefixCls(componentName: string, customPrefix?: string) {
    return `${customPrefix || prefixCls}-${componentName}`;
  }

  const config: ConfigProviderProps = {
    ...omit(props, ["children"]),
    getPrefixCls,
  };

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export default ConfigProvider;
