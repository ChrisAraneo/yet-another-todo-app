const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const jsonDiff = require("json-diff");
const log4js = require("log4js");

let data = null;
const token = "M0CK_TOKEN";

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

server.post("/signup", (request, response) => {
  logger.debug("Received POST /signup request. Responding with success");

  const { body } = request;

  response.set(responseHeaders).send(
    JSON.stringify({
      status: "success",
      data: {
        id: 'this_is_mock_id',
        name: body.name,
        username: body.username
      },
    })
  );
})

server.post("/login", (_, response) => {
  logger.debug("Received POST /login request. Responding with example token.");

  response.set(responseHeaders).send(
    JSON.stringify({
      status: "success",
      data: token,
    })
  );
})

server.get("/tasks", (_, response) => {
  logger.debug("Received GET /tasks request");

  if (!data) {
    logger.debug("Cache is empty");
    logger.debug("Reading store file");
    data = readStoreFile(storePath);
  }

  logger.debug("Sending response to GET /tasks");

  response.set(responseHeaders).send(
    JSON.stringify({
      status: "success",
      data: data,
    })
  );
});

server.post("/task", (request, response) => {
  logger.debug("Received POST /task request");

  const task = request.body;

  const isHavingThisTask = !!data.find(item => item.id === task.id);

  let updatedData;
  if (isHavingThisTask) {
    updatedData = data.map(item => {
      if (item.id === task.id) {
        return task;
      } else {
        return item;
      }
    });
  } else {
    updatedData = [...data, task];
  }

  if (jsonDiff.diff(updatedData, data)) {
    logger.debug("Updating store data");
    data = updatedData;

    logger.debug("Writing store file");
    writeStoreFile(storePath, JSON.stringify(body));
    
    logger.debug("Sending response to POST /task");
    response.set(responseHeaders).send(task);
  } else {
    logger.debug("Sending response to POST /task");
    response.set(responseHeaders).send({
      status: "success",
      data: task,
    });
  }
});

server.delete("/task", (request, response) => {
  logger.debug("Received DELETE /task request");

  const task = request.body;
  const updatedData = data.filter(item => item.id !== task.id);

  if (jsonDiff.diff(updatedData, data)) {
    logger.debug("Updating store data");
    data = updatedData;

    logger.debug("Writing store file");
    writeStoreFile(storePath, JSON.stringify(body));
    
    logger.debug("Sending response to DELETE /task");
    response.set(responseHeaders).send(task);
  } else {
    logger.debug("Sending response to DELETE /task");
    response.set(responseHeaders).send({
      status: "success",
      data: task,
    });
  }
});

server.delete("/user", (request, response) => {
  logger.debug("Received DELETE /user request");

  response.set(responseHeaders).send({
    status: "success",
    data: request.body,
  });
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
