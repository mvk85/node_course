/** Delete directory and subdirectory (recursive) */

const fs = require('fs');
const util = require('util');

const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);

async function deleteFolderRecursive (path) {
  const ext = await exists(path);

  if (ext) {
    const arFiles = await readdir(path);

    for (const file of arFiles) {
      const curPath = path + '/' + file;
      const stats = await stat(curPath);

      if (stats.isDirectory()) {
        await deleteFolderRecursive(curPath);
      } else {
        await unlink(curPath);
      }
    }

    await rmdir(path);
  }
}

module.exports = deleteFolderRecursive;
