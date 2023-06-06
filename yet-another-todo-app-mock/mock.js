const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const jsonDiff = require("json-diff");
const log4js = require("log4js");
const bodyParser = require("body-parser");

let data = null;

const TOKEN = "M0CK_TOKEN";
const SUCCESS = "success";
const ERROR = "error";
const DIFF = "diff";
const NOT_DIFF = "not-diff";

const server = express();
const port = 9339;
const storePath = process.argv[2] ? process.argv[2] : path.join(process.cwd(), "/store.json");
const responseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const logger = log4js.getLogger();
logger.level = "debug";

server.use(cors());
server.use(bodyParser.json({ limit: "4mb" }));

server.post("/signup", (request, response) => {
  logger.debug("Received POST /signup request. Responding with success");

  const { body } = request;

  response.set(responseHeaders).send(
    JSON.stringify({
      status: SUCCESS,
      data: {
        id: "this_is_mock_id",
        name: body.name,
        username: body.username,
      },
    })
  );
});

server.post("/login", (_, response) => {
  logger.debug("Received POST /login request. Responding with example token.");

  response.set(responseHeaders).send(
    JSON.stringify({
      status: SUCCESS,
      data: TOKEN,
    })
  );
});

server.get("/tasks", (_, response) => {
  logger.debug("Received GET /tasks request");

  readStoreFileIfDataIsNull();

  logger.debug("Sending response to GET /tasks");

  response.set(responseHeaders).send(
    JSON.stringify({
      status: SUCCESS,
      data: data,
    })
  );
});

server.post("/task", (request, response) => {
  logger.debug("Received POST /task request");

  readStoreFileIfDataIsNull();

  const task = request.body;
  const result = createOrUpdateTask(task);

  if (result === DIFF) {
    logger.debug("Writing store file");
    writeStoreFile(storePath, JSON.stringify(data));
  }

  logger.debug("Sending response to POST /task");
  response.set(responseHeaders).send({
    status: SUCCESS,
    data: task,
  });
});

server.post("/tasks", (request, response) => {
  logger.debug("Received POST /tasks request");

  readStoreFileIfDataIsNull();

  const tasks = request.body;

  let hasChanged = false;
  tasks.forEach((task) => {
    const result = createOrUpdateTask(task);

    if (result === DIFF) {
      hasChanged = true;
    }
  });

  if (hasChanged) {
    logger.debug("Writing store file");
    writeStoreFile(storePath, JSON.stringify(data));
  }

  logger.debug("Sending response to POST /task");
  response.set(responseHeaders).send({
    status: SUCCESS,
    data: data,
  });
});

server.delete("/task", (request, response) => {
  logger.debug("Received DELETE /task request");

  if (!data) {
    logger.debug("Store data is empty, nothing to delete");

    logger.debug("Sending response to DELETE /task");
    response.set(responseHeaders).send({
      status: SUCCESS,
      data: task,
    });
  }

  const task = request.body;
  const updatedData = data.filter((item) => item.id !== task.id);

  if (jsonDiff.diff(updatedData, data)) {
    logger.debug("Updating store data");
    data = updatedData;

    logger.debug("Writing store file");
    writeStoreFile(storePath, JSON.stringify(updatedData));

    logger.debug("Sending response to DELETE /task");
    response.set(responseHeaders).send(task);
  } else {
    logger.debug("Sending response to DELETE /task");
    response.set(responseHeaders).send({
      status: SUCCESS,
      data: task,
    });
  }
});

server.delete("/user", (request, response) => {
  logger.debug("Received DELETE /user request");

  response.set(responseHeaders).send({
    status: SUCCESS,
    data: request.body,
  });
});

server.listen(port, () => {
  logger.debug(`Server started running at ${port}`);
});

function readStoreFileIfDataIsNull() {
  if (data === null) {
    logger.debug("Cache is empty");
    logger.debug("Reading store file");
    data = readStoreFile(storePath);
  }
}

function createOrUpdateTask(task) {
  if (data === null) {
    data = [task];

    return DIFF;
  }

  const existingTaskIndex = data.findIndex((item) => item.id === task.id);

  if (existingTaskIndex >= 0) {
    const existingTask = data[existingTaskIndex];

    if (jsonDiff.diff(existingTask, task)) {
      data[existingTaskIndex] = task;

      return DIFF;
    } else {
      return NOT_DIFF;
    }
  } else if (data !== null) {
    data.push(task);

    return DIFF;
  }
}

function writeStoreFile(filePath, fileContent) {
  try {
    fs.writeFileSync(filePath, fileContent, "utf-8");
  } catch (e) {
    return JSON.stringify({
      status: ERROR,
      message: e,
      data: null,
    });
  }

  return JSON.stringify({
    status: SUCCESS,
    data: null,
  });
}

function readStoreFile(filePath) {
  let content = fs.readFileSync(filePath);
  return JSON.parse(content);
}
