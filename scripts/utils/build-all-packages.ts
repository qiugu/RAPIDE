import buildPackage, { BuildOptions } from "./build-package";
import getPackagesList from "./get-packages-list";

export default async function buildAllPackages(options?: BuildOptions) {
  const pkgList = await getPackagesList();

  options = Object.assign({}, options, {
    sourcemap: true,
    analyze: false,
    formats: ['es', 'cjs']
  });

  for (const pkg of pkgList) {
    await buildPackage(pkg.packageJson.name, options);
  }

  return pkgList;
}
