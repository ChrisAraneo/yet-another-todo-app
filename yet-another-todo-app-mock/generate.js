const { faker } = require("@faker-js/faker");
const { addDays } = require("date-fns");
const fs = require("fs");

const path = require("path");

const taskStates = [
  {
    id: "386db121-e9b7-4801-856a-10af38cc54d7",
    value: "NOT_STARTED",
    iconName: "auto_awesome",
    color: "#888888",
  },
  {
    id: "17fc6138-53c6-41d9-b3dd-83ef2ed032ab",
    value: "IN_PROGRESS",
    iconName: "autorenew",
    color: "orange",
  },
  {
    id: "704b0396-f363-4981-b3f9-672620a4f959",
    value: "SUSPENDED",
    iconName: "hourglass_empty",
    color: "black",
  },
  {
    id: "09be771f-6df5-465e-a77a-0c002ca51278",
    value: "COMPLETED",
    iconName: "task_alt",
    color: "#69f0ae",
  },
  {
    id: "0ee65977-e7ff-4f94-aeb3-1b395b808637",
    value: "REJECTED",
    iconName: "not_interested",
    color: "#f44336",
  },
];

const tasks = [];

function generate() {
  const storePath = process.argv[2]
    ? process.argv[2]
    : path.join(process.cwd(), "/store.json");

  const numberOfTasks = process.argv[3] ? +process.argv[3] : 100;

  let i = 0;
  while (i < numberOfTasks) {
    tasks.push(createRandomTask());
    i++;
  }

  writeStoreFile(storePath, JSON.stringify(tasks));
}

function createRandomTask() {
  const taskStateId = getRandomInt(taskStates.length - 1);
  const taskState = taskStates[taskStateId];
  const lorem = faker.lorem.lines(1).split(" ");

  let task = {
    id: faker.datatype.uuid(),
    title: `${lorem[0]} ${lorem[1]}`,
    description: faker.lorem.lines(1),
    state: taskState,
    creationDate: new Date(),
    isHidden: faker.datatype.boolean(),
    startDate: undefined,
    endDate: undefined,
  };

  if (taskState.value !== "NOT_STARTED") {
    task.startDate = addDays(new Date(), getRandomInt(200) - 100);
  }

  if (taskState.value === "COMPLETED" || taskState.value === "REJECTED") {
    task.endDate = addDays(task.startDate, getRandomInt(200));
  }

  return task;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function writeStoreFile(filePath, fileContent) {
  try {
    fs.writeFileSync(filePath, fileContent, "utf-8");
  } catch (e) {
    throw e;
  }
}

generate();