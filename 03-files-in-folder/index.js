//all files in secret folder
//<filename>-<fileext>-<weeight>
// example - txt - 128.369kb
// only for files. Directories must be ignored

const fs = require('fs/promises');
const path = require('path');

const staticUrl = path.join(__dirname, 'secret-folder');

//getting folder entries
fs.readdir(staticUrl, { withFileTypes: true })
  .then((recivedRawData) => {
    //exclude directories
    let filtered = recivedRawData.filter((x) => x.isDirectory() !== true);
    filtered.map((x) => showInfo(staticUrl, x.name));
  })
  .catch((err) => console.log(err));

async function showInfo(recivedPath, fullname) {
  const extension = path.extname(fullname);
  const shortName = path.basename(fullname, extension);
  const filesize = await fs
    .stat(path.resolve(recivedPath, fullname))
    .then((x) => x.size)
    .catch((err) => console.log(err));

  console.log(
    `${shortName} - ${extension.replace('.', '')} - ${Math.ceil(
      filesize / 1024,
    )} kilobytes`,
  );
}
