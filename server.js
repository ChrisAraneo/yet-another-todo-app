const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const environmentDev = require('./src/environments/environment.json');

const server = express();
const port = environmentDev.port;
const storePath = process.argv[2] ? process.argv[2] : path.join(process.cwd(), '/store.json');
const responseHeaders = environmentDev.responseHeaders;

server.use(express.json());
server.use(cors());

server.get('/', (_, response) => {
  response.set(responseHeaders).send({
    status: 'success',
    data: JSON.stringify(readStoreFile(storePath)),
  });
});

server.post('/', (request, response) => {
  const { body } = request;
  const result = writeStoreFile(storePath, JSON.stringify(body));
  response.set(responseHeaders).send(result);
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});

function writeStoreFile(filePath, fileContent) {
  try {
    fs.writeFileSync(filePath, fileContent, 'utf-8');
  } catch (e) {
    return JSON.stringify({
      status: 'error',
      message: e,
      data: null,
    });
  }

  return JSON.stringify({
    status: 'success',
    data: null,
  });
}

function readStoreFile(filePath) {
  let content = fs.readFileSync(filePath);
  return JSON.parse(content);
}
