import path from "path";
import fs from "fs-extra";
import { OutputOptions } from 'rollup';
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import nodeExternals from "rollup-plugin-node-externals"; // 排除node_modules包中的内容，防止打包
import json from "@rollup/plugin-json"; // 导入json文件，无需使用JSON.parse转换
import { nodeResolve } from "@rollup/plugin-node-resolve"; // 解析第三方的插件，将第三方插件转换为esmodule导入
// import alias from "@rollup/plugin-alias"; // 设置路径别名
import virtualizer from "rollup-plugin-visualizer";
import getPackagesList from "../../scripts/utils/get-packages-list";

interface PkgConfig {
  basePath: string;
  format: string;
  analyze: boolean;
  sourcemap: boolean;
  entry?: string;
  externals?: string[];
}

export default async function createPackageConfig(config: PkgConfig) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(config.basePath, "./package.json")).toString("utf-8")
  );
  const pkgList = await getPackagesList();
  const plugins = [
    commonjs(),
    nodeExternals(),
    json(),
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
    esbuild({
      minify: config.format === "umd",
      sourceMap: false,
      tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
    }),
  ];
  const externals = [
    ...(config.externals || []),
    ...Object.keys({
      ...packageJson.peerDependencies
    })
  ];
  const output: OutputOptions = {
    name: packageJson.name,
    sourcemap: config.sourcemap
  };

  if (config.format === 'es') {
    output.dir = path.resolve(config.basePath, 'esm');
    output.preserveModules = true; // 保留引用的每个文件，使之不会打包到一起
  }

  if (config.format === 'cjs') {
    output.dir = path.resolve(config.basePath, 'cjs');
    output.preserveModules = true;
    output.exports = 'named'; // 设置变量导出模式
  }

  if (config.format === 'umd') {
    output.dir = path.resolve(config.basePath, 'lib/index.umd.js');
    output.globals = {
      ...pkgList
        .map(pkg => ({
          [pkg.packageJson.name]: pkg.packageJson.name
        }))
        .reduce((globals, pkgGlobals) => ({ ...globals, ...pkgGlobals }), {}),
      React: 'React',
      'react-dom': 'ReactDOM'
    }
  }

  if (config.analyze && config.format === 'es') {
    plugins.push(
      virtualizer({
        title: packageJson.name,
        filename: path.join(config.basePath, 'lib/stats.html'),
        projectRoot: path.join(config.basePath, '.'),
        sourcemap: true,
        gzipSize: true
      }),
      virtualizer({
        title: packageJson.name,
        filename: path.join(config.basePath, 'lib/stats.json'),
        projectRoot: path.join(config.basePath, '.'),
        template: 'raw-data',
        sourcemap: true,
        gzipSize: true
      })
    )
  }

  return {
    input: config.entry || path.resolve(config.basePath, 'src/index.ts'),
    output,
    external: externals,
    plugins,
  };
}
