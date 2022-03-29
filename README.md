# Interview-app-ui
[![Build](https://github.com/3PillarGlobal-Czechia/interview-app-ui/actions/workflows/build.yml/badge.svg)](https://github.com/3PillarGlobal-Czechia/interview-app-ui/actions/workflows/build.yml)
[![Deploy](https://github.com/3PillarGlobal-Czechia/interview-app-ui/actions/workflows/deploy.yml/badge.svg)](https://github.com/3PillarGlobal-Czechia/interview-app-ui/actions/workflows/deploy.yml)
[![Inspect dependencies](https://github.com/3PillarGlobal-Czechia/interview-app-ui/actions/workflows/inspect.yml/badge.svg)](https://github.com/3PillarGlobal-Czechia/interview-app-ui/actions/workflows/inspect.yml)

Welcome to the UI repository of Interview app. The goal of this project is to create a tool that helps technical interviewers lead an interview with increased confidence and the ability to stay consistent across multiple interviews.

## Documentation

- [Contributing](CONTRIBUTING.md)
- [Folder structure](docs/FOLDER_STRUCTURE.md)
- [API client](docs/API_CLIENT.md)
- [Application Desing](docs/DESIGN.md)

## Technical stack
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [AntD](https://ant.design/)

## Local setup

- run `npm install`
- Make sure [the API](https://github.com/3PillarGlobal-Czechia/interview-app-api) is running on the URL specified in the `.env` file
- run `npm start`
- application will start on `http://localhost:3000/`

### Other scripts

`npm start` - Runs the app in the development mode \
`npm test` - Launches the test runner in the interactive watch mode \
`npm lint` - Runs [ESLint](https://eslint.org/) with the quiet and autofix flags \
`npm run build` - Builds the app for production to the `build` folder
