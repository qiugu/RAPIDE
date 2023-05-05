import path from 'path';
import createPackageConfig from "../../configuration/rollup/create-package-config";
import compile from "./compile";
import locatePackage from './locate-package';

export interface BuildOptions {
  analyze: boolean;
  sourcemap: boolean;
  formats: string[];
}

export default async function buildPackage(_packageName: string, options?: BuildOptions) {
  console.log(options,'pppp')
  const packagePath = await locatePackage(_packageName);

  try {
    for (const format of options?.formats) {
      const config = await createPackageConfig({
        ...options,
        basePath: packagePath,
        format
      });

      await compile(config);
    }
    console.log('Package compile successfully.');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
