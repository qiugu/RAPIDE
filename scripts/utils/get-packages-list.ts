import path from 'path';
import fs from 'fs-extra';

export default async function getPackagesList() {
  const basePath = path.resolve(__dirname, '../../packages');
  const pkgPaths = await fs.readdir(basePath);
  const packages = [];

  for (const pkgPath of pkgPaths) {
    const pkgJsonPath = path.resolve(basePath, pkgPath, 'package.json');

    if (await fs.pathExists(pkgJsonPath)) {
      packages.push({
        path: path.join(basePath, pkgPath),
        packageJsonPath: pkgJsonPath,
        packageJson: await fs.readJSON(pkgJsonPath)
      });
    }

    return packages;
  }
}
