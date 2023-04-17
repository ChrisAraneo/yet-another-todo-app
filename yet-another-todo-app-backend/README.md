# YATA - Nest.js Backend

## Development

### Reguired software

- Node.js - recommended v18.13.0
- npm (recommended v8.19.3) or another package manager
- Nest.js CLI - recommended v9.2.0
- Docker

### Installation

```bash
npm install
```

### Creating database container

```bash
docker compose up yata-dev-db -d
```

### Running Prisma migration

```bash
npx prisma migrate dev
```

### Registering user using API

You need a user account to use the app.
To sign up, send a POST request to the /signup endpoint.

```bash
curl --location 'http://localhost:9339/signup' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test",
    "password": "Qwerty123/",
    "name": "Test user"
}'
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Project is [MIT licensed](LICENSE).
