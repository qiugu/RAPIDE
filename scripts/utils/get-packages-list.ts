import path from 'path';
import fs from 'fs-extra';

interface PackageJson {
  name: string;
}

interface PackageInfo {
  path: string;
  packageJsonPath: string;
  packageJson: PackageJson;
}

export default async function getPackagesList(): Promise<PackageInfo[]> {
  const basePath = path.resolve(__dirname, '../../packages');
  const pkgPaths = await fs.readdir(basePath);
  const packages: PackageInfo[] = [];

  for (const pkgPath of pkgPaths) {
    const pkgJsonPath = path.resolve(basePath, pkgPath, 'package.json');

    if (await fs.pathExists(pkgJsonPath)) {
      packages.push({
        path: path.join(basePath, pkgPath),
        packageJsonPath: pkgJsonPath,
        packageJson: await fs.readJSON(pkgJsonPath)
      });
    }
  }

  return packages;
}
