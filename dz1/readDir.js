var fs = require('fs');

function getFileObj ({ name, path }) {
  let firstSymbol = name.slice(0, 1).toLowerCase();

  return {
    symbol: firstSymbol,
    name,
    path
  };
}

function readDir (path, resultObj = {}) {
  try {
    const dirObj = fs.readdirSync(path);
    addFileObj(dirObj);
  } catch (e) {
    console.error(e);
    return;
  }

  function addFileObj (arFiles) {
    if (!arFiles) {
      return;
    }
    arFiles.forEach(fileName => {
      const pathFile = path + '/' + fileName;
      const stats = fs.statSync(pathFile);

      statCheck(stats);

      function statCheck (stats) {
        if (stats.isDirectory()) {
          resultObj = readDir(pathFile, resultObj);
        } else {
          const objFile = getFileObj({ name: fileName, path });

          if (resultObj[objFile.symbol]) {
            resultObj[objFile.symbol].push(objFile);
          } else {
            resultObj[objFile.symbol] = [objFile];
          }
        }
      }
    });
  }

  return resultObj;
}

module.exports = readDir;
