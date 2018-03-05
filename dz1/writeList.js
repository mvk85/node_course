const fs = require('fs');

function normalizeNameFiles (arFileObj) {
  if (arFileObj.length < 2) {
    return arFileObj;
  }

  const newArFileObj = [];

  arFileObj.forEach((fileObj, index) => {
    let newName;
    const newFileObj = {...fileObj};
    const nameFile = newFileObj.name;

    if (index > 0) {
      const tempArFile = nameFile.split('.');
      const ext = tempArFile.pop();

      newName = tempArFile.join('.') + '(' + index + ').' + ext;
    } else {
      newName = nameFile;
    }
    newFileObj.newName = newName;
    newArFileObj.push(newFileObj);
  });

  return newArFileObj;
}

function createDir (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function writeListFiles (listFilesObj, dir) {
  createDir(dir);

  const arFilesObj = Object.entries(listFilesObj);

  arFilesObj.forEach((arEntry) => {
    const [key, arFilesObj] = arEntry;
    const pathDir = dir + '/' + key;

    createDir(pathDir);
    const arFiles = normalizeNameFiles(arFilesObj);

    arFiles.forEach(fileObj => {
      const {name, path: pathFile, newName} = fileObj;
      const src = pathFile + '/' + name;
      let dest;
      if (newName) {
        dest = pathDir + '/' + newName;
      } else {
        dest = pathDir + '/' + name;
      }

      fs.copyFileSync(src, dest);
    });
  });
}

module.exports = writeListFiles;
