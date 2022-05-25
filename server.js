const path = require('path');
const fs = require('fs');
const express = require('express');

const server = express();
const port = 9339;
const storePath = process.argv[2] ? process.argv[2] : path.join(process.cwd(), '/store.json');

server.use(express.json());

server.get('/', (request, response) => {
  response.send(JSON.stringify(readStoreFile(storePath)));
});

server.post('/', (request, response) => {
  const { body } = request;
  const result = writeStoreFile(storePath, JSON.stringify(body));
  response.send(result);
});

server.listen(port, function () {
  console.log(`Server running at ${port}`);
});

function writeStoreFile(filePath, fileContent) {
  try {
    fs.writeFileSync(filePath, fileContent, 'utf-8');
  } catch (e) {
    return 'Failed to save the file!';
  }
  return 'File saved.';
}

function readStoreFile(filePath) {
  let content = fs.readFileSync(filePath);
  return JSON.parse(content);
}
