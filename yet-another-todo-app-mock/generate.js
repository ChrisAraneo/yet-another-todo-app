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
  const storePath = process.argv[2] ? process.argv[2] : path.join(process.cwd(), "/store.json");

  const totalNumberOfTasks = process.argv[3] ? +process.argv[3] : 750;
  const numberOfNotStartedTasks = totalNumberOfTasks < 10 ? totalNumberOfTasks : 10;
  const startDate = addDays(new Date(), -365);
  const endDate = addDays(new Date(), 365);

  while (tasks.length < totalNumberOfTasks - numberOfNotStartedTasks) {
    let date = startDate;

    while (+date < +endDate) {
      if (tasks.length < totalNumberOfTasks - numberOfNotStartedTasks) {
        const taskStateId = getRandomInt(taskStates.length - 2);
        const taskState = taskStates[taskStateId + 1];
        tasks.push(createRandomTask(date, date, taskState));
        date = addDays(date, 1);
      } else {
        date = endDate;
      }
    }
  }

  for (let i = 0; i < numberOfNotStartedTasks; i++) {
    tasks.push(createRandomTask(new Date(), undefined, taskStates[0]));
  }

  writeStoreFile(storePath, JSON.stringify(tasks));
}

function createRandomTask(startDate, endDate, taskState) {
  const lorem = faker.lorem.lines(1).split(" ");

  let task = {
    id: faker.datatype.uuid(),
    title: `${lorem[0]} ${lorem[1]}`,
    description: faker.lorem.lines(1),
    state: taskState,
    creationDate: startDate,
    isHidden: faker.datatype.boolean(),
    startDate: undefined,
    endDate: undefined,
  };

  if (taskState.value !== "NOT_STARTED") {
    task.startDate = startDate;
  }

  if (taskState.value !== "NOT_STARTED" && taskState.value !== "IN_PROGRESS" && taskState.value !== "SUSPENDED") {
    task.endDate = endDate;
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
