# ヤタ YATA - Yet Another Todo App

<i>Developing a simple daily planner that I would personally use</i>

![App with example tasks](/screenshot_v03.png?raw=true "App with example tasks")

# Key Features (v0.3)

- Sign up users
- Log in using username and password
- Create, edit and delete tasks
- View tasks on a timeline
- Change the time period displayed on the timeline
- View tasks in a table form
- Export tasks to encrypted zip archive
- Import tasks from zip archive
- Use app in offline mode
- Delete users

Version 0.3 introduces many architectural design changes, refactoring, and code improvements, along with a complete visual design overhaul.

# Major UI visual design changes

v0.2:

![Screenshot of v0.2 app](/screenshot_v02.png?raw=true "App with example tasks (v0.2)")

v0.3:

![Screenshot of v0.3 app](/screenshot_v03.png?raw=true "App with example tasks (v0.3)")

# Roadmap

What is planned for future releases?

- Upgrade of dependencies
- UI upgrade to Angular 19
- Use of Nx Smart Monorepo features
- Backend improvements and framework update
- Code refactoring
- More unit tests, e2e tests

All current features will be improved in upcoming releases.

# Development setup

## Required software

- Node.js - recommended at least v18.13.0
- npm - recommended at least v8.19.3
- Nest.js CLI - recommended v9.2.0
- Docker

Optional but recommended:

- Angular CLI

## Installing dependencies

```bash
$ npm install
```
```bash
/yet-another-todo-app-backend$ npm install
```
```bash
/yet-another-todo-app-dev-scripts$ npm install
```
```bash
/yet-another-todo-app-frontend$ npm install
```
```bash
/yet-another-todo-app-mock$ npm install
```
```bash
/yet-another-todo-app-shared$ npm install
```

## Creating database container

Create a docker container and then run it:

```bash
/yet-another-todo-app-backend$ docker compose up yata-dev-db -d
```

## Running Prisma migration

Run Prisma migration:

```bash
/yet-another-todo-app-backend$ npx prisma migrate dev
```

([Read more about it in the Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production))


## Registering user using API

You need a user account to use the app.
To sign up, send a POST request to the /signup endpoint.
You can use cURL or any other software of your choice:

```bash
curl --location 'http://localhost:9339/signup' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test",
    "password": "Qwerty123/",
    "name": "Test user"
}'
```

## Running the application in development mode

1. Before starting Angular UI for the first time, you must generate color palettes & theme variables that are used by components (you can modify theme using `theme-config.json`):

```bash
/yet-another-todo-app-dev-scripts$ npm run theme-generator
```

2. Make sure database is running in Docker container and then start backend:

```bash
/yet-another-todo-app-backend$ npm run start:dev
```

3. Start Angular UI:

```bash
/yet-another-todo-app-frontend$ npm run start
```

If you have done all the previous steps without errors, you should be able to access the application interface from the browser on the [http://localhost:4200/](http://localhost:4200/)

Voila!

# Testing

```bash
# Angular

# unit tests
/yet-another-todo-app-frontend$ npm run test
```

```bash
# Nest.JS

# unit tests
/yet-another-todo-app-backend$ npm run test

# e2e tests
/yet-another-todo-app-backend$ npm run test:e2e

# test coverage
/yet-another-todo-app-backend$ npm run test:cov
```

# Motivation

I needed an easy way to write down tasks and things to do while working, so I started developing this hobby project.
It is also a way to practice programming skills in my free time.

# License

Project is [MIT licensed](LICENSE).
