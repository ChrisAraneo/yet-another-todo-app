const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const jsonDiff = require("json-diff");
const log4js = require("log4js");

let data = null;

const server = express();
const port = 9339;
const storePath = process.argv[2]
  ? process.argv[2]
  : path.join(process.cwd(), "/store.json");
const responseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const logger = log4js.getLogger();
logger.level = "debug";

server.use(express.json());
server.use(cors());

server.get("/", (_, response) => {
  logger.debug("Received GET / request");
  if (!data) {
    logger.debug("Cache is empty");
    logger.debug("Reading store file");
    data = readStoreFile(storePath);
  }

  logger.debug("Sending response to GET /");
  response.set(responseHeaders).send(
    JSON.stringify({
      status: "success",
      data: data,
    })
  );
});

server.post("/", (request, response) => {
  logger.debug("Received POST / request");

  const { body } = request;

  if (jsonDiff.diff(body, data)) {
    logger.debug(
      "Request contained different store object than currently stored so it will be updated"
    );
    data = body;

    logger.debug("Writing store file");
    const result = writeStoreFile(storePath, JSON.stringify(body));
    logger.debug("Sending response to POST /");
    response.set(responseHeaders).send(result);
  } else {
    logger.debug("Sending response to POST /");
    response.set(responseHeaders).send({
      status: "success",
      data: data,
    });
  }
});

server.listen(port, () => {
  logger.debug(`Server started running at ${port}`);
});

function writeStoreFile(filePath, fileContent) {
  try {
    fs.writeFileSync(filePath, fileContent, "utf-8");
  } catch (e) {
    return JSON.stringify({
      status: "error",
      message: e,
      data: null,
    });
  }

  return JSON.stringify({
    status: "success",
    data: null,
  });
}

function readStoreFile(filePath) {
  let content = fs.readFileSync(filePath);
  return JSON.parse(content);
}
