/** Write list files object to destination path */

const fs = require('fs');
const util = require('util');

const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const copyFile = util.promisify(fs.copyFile);

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

async function createDir (dir) {
  const ext = await exists(dir);

  if (!ext) {
    await mkdir(dir);
  }
}

async function writeListFiles (listFilesObj, dir) {
  await createDir(dir);

  const arFilesObj = Object.entries(listFilesObj);

  for (const arEntry of arFilesObj) {
    const [key, arFilesObj] = arEntry;
    const pathDir = dir + '/' + key;

    await createDir(pathDir);

    const arFiles = normalizeNameFiles(arFilesObj);

    for (const fileObj of arFiles) {
      const {name, path: pathFile, newName} = fileObj;
      const src = pathFile + '/' + name;
      let dest;

      if (newName) {
        dest = pathDir + '/' + newName;
      } else {
        dest = pathDir + '/' + name;
      }

      await copyFile(src, dest);
    }

    // arFiles.forEach(fileObj => {
    //   const {name, path: pathFile, newName} = fileObj;
    //   const src = pathFile + '/' + name;
    //   let dest;
    //   if (newName) {
    //     dest = pathDir + '/' + newName;
    //   } else {
    //     dest = pathDir + '/' + name;
    //   }

    //   fs.copyFileSync(src, dest);
    // });
  }

  // arFilesObj.forEach((arEntry) => {
  //   const [key, arFilesObj] = arEntry;
  //   const pathDir = dir + '/' + key;

  //   await createDir(pathDir);
  //   const arFiles = normalizeNameFiles(arFilesObj);

  //   arFiles.forEach(fileObj => {
  //     const {name, path: pathFile, newName} = fileObj;
  //     const src = pathFile + '/' + name;
  //     let dest;
  //     if (newName) {
  //       dest = pathDir + '/' + newName;
  //     } else {
  //       dest = pathDir + '/' + name;
  //     }

  //     fs.copyFileSync(src, dest);
  //   });
  // });
}

module.exports = writeListFiles;
