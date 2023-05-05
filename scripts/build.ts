import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import buildAllPackages from './utils/build-all-packages';
import buildPackage from './utils/build-package';

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option('all', {
    type: 'boolean',
    default: false,
    description: 'Build all packages.'
  })
  .option('project', {
    type: 'string',
    description: 'Specify build package.'
  })
  .option('analyze', {
    type: 'boolean',
    default: false,
    description: 'If use analyze package.'
  })
  .option('sourcemap', {
    type: 'boolean',
    default: false,
    description: 'Generate sourcemap.'
  })
  .option('formats', {
    type: 'string',
    array: true,
    choices: ['es', 'cjs', 'umd'],
    description: 'Specify package format.'
  });

(async () => {
  const { analyze, sourcemap, formats } = argv;
  if (argv._[0] === 'all' || argv.all) {
    await buildAllPackages({
      analyze,
      sourcemap,
      formats
    });
  } else if (argv._ || argv.project) {
    for (const item of argv._) {
      await buildPackage(item, {
        analyze,
        sourcemap,
        formats
      });
    }
  }
})();
