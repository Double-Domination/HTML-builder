const fs = require('fs/promises');
const fso = require('fs');
const path = require('path');

const pStyles = path.join(__dirname, 'styles');
const pDist = path.join(__dirname, 'project-dist', 'bundle.css');
const cssExt = '.css';

//open write stram into bundle

let wStream = fso.createWriteStream(pDist);

async function findCSS() {
  let readEntries = await fs.readdir(pStyles, { withFileTypes: true });
  let cssFilesOnly = readEntries.filter((x) => {
    return x.isFile() === true && path.extname(x.name) === cssExt;
  });

  return cssFilesOnly.map((x) => x.name);
}

async function pipeStyles(recivedCssFile) {
  return new Promise((res, rej) => {
    let rStream = fso.createReadStream(path.resolve(pStyles, recivedCssFile));
    rStream.pipe(wStream);
    rStream.on('end', (err) => {
      if (err) {
        rej(err);
      }
      rej(`done ${recivedCssFile}`);
    });
  });
}

async function bundol() {
  const cssUnprocessed = await findCSS();
  cssUnprocessed.map(async (x) => {
    try {
      await pipeStyles(x);
    } catch (err) {
      console.log(err);
    }
  });
}

// let result = await findCSS();
// console.log(result);

bundol();
