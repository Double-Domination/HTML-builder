//standard modules imports
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { resolve } = require('path/posix');
const { exit, stdin } = require('process');

//filepath
const staticUrl = path.join(__dirname, './stuff.txt');

function ask() {
  const getUserInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    try {
      getUserInput.question('>>input something: ', (userInput) => {
        getUserInput.close();
        resolve(userInput);
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function main() {
  let currentInput = await ask();

  if (currentInput !== 'exit') {
    return main();
  }
}

let wStream = fs.createWriteStream(staticUrl, 'utf-8');

stdin.pipe(wStream);

main();

process.on('exit', (code) => {
  console.log(`\n THX FOR USIN UR APP! Exit code (${code})`);
});
