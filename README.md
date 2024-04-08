# ヤタ YATA - Yet Another Todo App

Developing a simple daily planner that I would personally use</i>

![App with example tasks](/screenshot.png?raw=true "App with example tasks")

# Features (v0.2)

- Sign up users
- Log in using username and password
- Create, edit and delete tasks
- View tasks on a timeline
- Change the time period displayed on the timeline
- View tasks in a table form
- Filter and sort displayed tasks (new in v0.2)
- Export tasks to encrypted zip archive (new in v0.2)
- Import tasks from zip archive (new in v0.2)
- Use app in offline mode (new in v0.2)
- Delete users (new in v0.2)

Version 0.2 also introduces many improvements and bug fixes to existing features.

# Roadmap

What is planned in future releases?

- Major UI redesign
- Code refactoring
- More unit tests, e2e tests
- Use of Angular Routing
- Upgrade to Angular 16+

All current features will be improved in the near future.

# Development setup

## Required software

- Node.js - recommended v18.13.0
- npm (recommended v8.19.3) or another package manager
- Nest.js CLI - recommended v9.2.0
- Docker

Optional & recommended:

- Angular CLI

## Installing dependencies

```bash
/yet-another-todo-app-backend$ npm install
```
```bash
/yet-another-todo-app-frontend$ npm install
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

1. Before starting Angular UI for the first time, you must generate color palettes that are used by components:

```bash
/yet-another-todo-app-dev-scripts$ npm run color-palletes-generator
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

# Why?

I needed an easy way to write down tasks and things to do while working, so I started developing this hobby project.
It is also a way to practice programming skills in my free time.

# License

Project is [MIT licensed](LICENSE).