# `// TODO Update readme`

# YATA - Backend mock

## What & why?

Mock was created as a quick backend replacement when you only need example data and not all backend functionality.

Mock accepts HTTP requests on port 9339, can send example tasks. Every user has the same tasks. It also stores changes like adding and removing tasks. Tasks are stored in json file.

## Development setup

### Required software

- Node.js - recommended v18.13.0
- npm (recommended v8.19.3) or another package manager

### Installing dependencies

```bash
npm install
```

### Running the mock

```bash
# Example:

$ npm run mock

# Mock will use default file store/store.json to store tasks data
```

```bash
# You can specify store file:

$ npm run mock your/path/to/store.json
```

## Generating example tasks

You can generate example tasks using generate.js script and then serve them with mock backend.
The data is generated using fakerjs.

```bash
# Example:

$ npm run generate 2500 your/path/to/store.json

# store.json is the file where mock will store task data
# The second argument is the number of tasks to generate
```

## License

Project is [MIT licensed](LICENSE).
