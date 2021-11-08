const fs = require('fs/promises');
const fso = require('fs');
const path = require('path');

const urlSource = path.join(__dirname, './files');
const urlDestination = path.join(__dirname, './files-copy');

async function cleanup() {
  // remove all at files-copy folder
  await fs.rm(urlDestination, { force: true, recursive: true });
  //recreate folder
  await fs.mkdir(urlDestination);
}

async function dir() {
  await cleanup();
  const allFolderEntries = await fs.readdir(urlSource, {
    withFileTypes: true,
  });
  // filter directories
  const filteredFilesOnly = allFolderEntries.filter((x) => {
    return x.isDirectory() !== true;
  });
  filteredFilesOnly.forEach((x) => {
    const srcCurrent = path.resolve(urlSource, x.name);
    const destCurrent = path.resolve(urlDestination, x.name);

    // console.log(srcCurrent, destCurrent);

    try {
      fso.copyFile(srcCurrent, destCurrent, null, () => console.log('copied'));
    } catch (error) {
      console.log(error);
    }
  });
}

dir();
