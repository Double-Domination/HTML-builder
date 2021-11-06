//importin INTERNAL modules
const fs = require('fs');
const path = require('path');

//as described in in task reqirements: "Tasks should be executed as
//node 01-read-file
// for that reason we must care about file path
const fixedPathUrl = path.join(__dirname, './text.txt');

//creating readable stream
let rStream = fs.createReadStream(fixedPathUrl, 'utf-8');

//emitting event when data is ready
rStream.on('data', (chunc) => {
  console.log(chunc);
});
