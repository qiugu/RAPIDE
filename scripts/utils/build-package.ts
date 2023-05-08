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
  const packagePath = await locatePackage(_packageName);

  if (!packagePath) {
    console.error(`Package ${_packageName} does not exist`);
    process.exit(1);
  }

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
