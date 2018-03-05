const yargs = require('yargs');
const readDir = require('./readDir');
const writeList = require('./writeList');
const deleteFolderRecursive = require('./deleteDir');

const argv = yargs
  .usage('command [options]')
  .help('h')
  .alias('h', 'help')
  .version('v', 'version', '0.0.1')
  .alias('v', 'version')
  .demand('s')
  .nargs('s', 1)
  .describe('s', 'source path')
  .alias('s', 'src')
  .default('s', 'd:/temp/demo')
  .demand('d')
  .describe('d', 'destination path')
  .alias('d', 'dest')
  .default('d', 'd:/temp/dest')
  .demand('clear')
  .describe('clear', 'delete source folder')
  .alias('c', 'clear')
  .default('c', false)
  .argv;

const pathSrc = argv.s;
const pathDest = argv.d;
const clear = argv.c;

if (typeof pathSrc !== 'string' || typeof pathDest !== 'string') {
  console.log('Write correct path source and destination');
  process.exit(-1);
}

(async function (pathSrc) {
  const listFiles = await readDir(pathSrc);

  await writeList(listFiles, pathDest);

  if (clear) {
    await deleteFolderRecursive(pathSrc);
  }

  console.log('done');
})(pathSrc);
