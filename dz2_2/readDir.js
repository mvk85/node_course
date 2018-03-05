/**
 * Read list files object from source path
 * Return object files
 * */

const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

function getFileObj ({ name, path }) {
  let firstSymbol = name.slice(0, 1).toLowerCase();

  return {
    symbol: firstSymbol,
    name,
    path
  };
}

async function readDir (path, resultObj = {}) {
  try {
    const arFiles = await readdir(path);

    if (!arFiles) {
      return;
    }

    for (const fileName of arFiles) {
      const pathFile = path + '/' + fileName;
      const stats = await stat(pathFile);

      if (stats.isDirectory()) {
        resultObj = await readDir(pathFile, resultObj);
      } else {
        const objFile = getFileObj({ name: fileName, path });

        if (resultObj[objFile.symbol]) {
          resultObj[objFile.symbol].push(objFile);
        } else {
          resultObj[objFile.symbol] = [objFile];
        }
      }
    }
  } catch (e) {
    console.error(e);
    return;
  }

  return resultObj;
}

module.exports = readDir;
