# YATA - Backend mock

## What & why?

Mock was created as a quick backend replacement when you need sample data and not all backend functionality.

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

$ node mock.js store.json

# store.json is the file where mock will store task data
```

## Generating example tasks

You can generate example tasks using generate.js script and then serve them with mock backend.

```bash
# Example:

$ node generate.js store.json 2500

# store.json is the file where mock will store task data
# The second argument is the number of tasks to generate
```

## License

Project is [MIT licensed](LICENSE).
