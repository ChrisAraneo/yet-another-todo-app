# ヤタ YATA - Yet Another Todo App

Developing a simple daily planner that I would personally use</i>

![App with example tasks](/screenshot.png?raw=true "App with example tasks")

# Features (v0.1)

- Sign up users
- Log in using username and password
- Create, edit and delete tasks
- View tasks on a timeline
- Change the time period displayed on the timeline
- View tasks in a table form

All the features are basic and will be improved in the near future.

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

Make sure database is running in docker container and then start backend:

```bash
/yet-another-todo-app-backend$ npm run start:dev
```

Then run Angular UI

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