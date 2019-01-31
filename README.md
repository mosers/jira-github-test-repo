# Lineage Logistics

A monorepository containing applications and shared libraries developed for Lineage Logistics.

- All projects are written using TypeScript
- [Lerna](https://lernajs.io/) is used to orchestrate common monorepo tasks
- Unit tests are written and executed by the [Jest](https://jestjs.io/) testing framework
- E2E testing is done via [Cucumber](https://github.com/cucumber/cucumber-js)

## Projects

- **`@lineage/core`**: Contains shared Redux modules and services (e.g. front-end auth/login service, dispatch module (reducer, actions, etc.)) used across warehouse and back-office applications.
- **`@lineage/dock`**: Lineage dock application. Integrates with the `@lineage/dock-api` to enable dock workers to manually initiate dock workflows, or choose a task dispatched by their supervisor.
- **`@lineage/dock-api`**: REST API for `@lineage/dock`. Integrates with WMS, and other services (ie. dispatching service) to provide CRUD functionality to consuming apps.
- **@lineage/dock-e2e**: End-to-end tests for `@lineage/dock`. Executes BDD criteria against a suite of tests that use Jest, Cucumber,and Puppeteer.
- **`@lineage/ui`**: Shared presentational components for use in `@lineage/dock` and future Lineage applications.

## Setup

Run the following commands to initialize the project dependencies for development:

```sh
npm i             # install monorepo dependencies
npm run bootstrap # install package dependencies
```

Next, copy the .env.example files in the `dock` and `dock-api` projects to a new .env file in the corresponding directory, e.g:

```sh
cd packages/dock
cp .env.example .env
```

The below table details the applications and ports they run on by default. You can modify the port by changing the `PORT` environment variable in the application's .env file.

| Port | Service      |
| ---- | ------------ |
| 3000 | Dock App     |
| 8000 | Dock App API |

Finally, run the following command to start the local dev environment:

```sh
npm start
```

## Development

Front-end projects (e.g. `dock`) are enhanced with live reloading and will update when styles and TypeScript code changes. Node projects (e.g. `dock-api`) will rebuild and restart when code changes.

The monorepo contains git hooks that will format committed code and validate commit messages using [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) as a style guide.

This project uses [Lerna](https://lernajs.io/) to orchestrate common monorepo tasks like bootstrapping dependencies, executing commands in one or more packages, and publishing to NPM. Lerna ships with several useful commands, including `lerna run` which allows you to execute a command listed in the package.json `"scripts"` field. For example, to run the `ios` script in the `@lineage/dock` application, you could run:

```sh
lerna run ios --scope=@lineage/dock --stream
```

`--scope` isolates the command to a single package. `--stream` will print the output of the command to the terminal.

## Testing

End-to-end tests require dependent projects to be bundled prior to execution. To run the E2E tests in the `dock-e2e` project, for example, run the following command:

```sh
npm run build                         # build all projects
npm test -- --scope=@lineage/dock-e2e # run `npm test` only in dock-e2e project
```

All tests (unit and end-to-end) can be run in parallel using the following command:

```sh
npm test
```
