# YATA - Nest.js Backend

## Development setup

### Required software

- Node.js - recommended v18.13.0
- npm (recommended v8.19.3) or another package manager
- Nest.js CLI - recommended v9.2.0
- Docker

### Installing dependencies

```bash
npm install
```

### Creating database container

Create a docker container and then run it:

```bash
docker compose up yata-dev-db -d
```

### Running Prisma migration

Run Prisma migration:

```bash
npx prisma migrate dev
```

([Read more about it in the Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production))

### Registering user using API

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

### Running the backend

Make sure database is running in docker container and then start backend:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Linting and formatting code

Before every commit don't forget to lint and format code:

```bash
$ npm run lint && npm run format
```

## License

Project is [MIT licensed](LICENSE).
