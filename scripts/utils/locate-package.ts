import path from 'path';
import fs from 'fs-extra';

export default async function locatePackage(packageName: string) {
  const fold = packageName.replace('@rapide/', '');
  const packagePath = path.resolve(__dirname, '../../packages', fold);
  const exist = await fs.pathExists(packagePath);

  return exist ? packagePath : null;
}
