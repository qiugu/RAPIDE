import path from 'path';
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../../stories/**/*.mdx", "../../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal (config) {
    const dirComponent = path.resolve(__dirname, '../../packages/components/esm');

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@self': dirComponent
      }
    }

    return config;
  }
};
export default config;
