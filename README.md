<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Simple Banking API

A simple REST API built in NestJS using TypeORM and SWAGGER.

## Used Stack

**Back-end**: Nest v10; NodeJS v18.18.2; Jest v29;

**Test**: SQLite 3;

**Development Environment**: nvm 0.39; npm 9.8;

## Installing

**IMPORTANT**: If you don't have the correct version of NodeJS installed, run `nvm install` to install it first;

First of all clone the project on you local! After cloning the project on your local machine, you will have to configure the environment by making a copy of the example configuration file (the `.env.exemple` file) to `.env` and adjusting the values, according to your local demand. But most of the settings are already very generic so you shouldn't need to change anything.

Then run the commands bellow:

```bash
cp .env.example .env
nvm use;
npm install;
```

After everything is installed then you should run the migrations commands as instructed below:

```bash
npm run typeorm migration:run
```

If no you see no error you are all set to git your first run.

# Running the app

## Dev env

The environment is composed of a local sqlite3 to facilitate the configuration of the database in the storage directory (so you know that the database is there and it is easier to delete it. It ensures that you also deleted the database repository when deleting the project from the local disk) and to run the project, just run the NestJS command available in the project with the command `npm run start:dev` and the system will be available in your local environment.

### Clear caches

To clear nestjs caches from the project home directory you just remove the `/dist` directory and restart the application ...

```bash
rm -rf ./dist
npm run start:dev
```

To clear TypeORM cache you just run ...

```bash
npm run typeorm cache:clear
```

## Unit testing

To run the unit tests at the project run the command `npm run test`.

If you are building any new unit testing use the `npm run test:watch` command.

# License

[MIT](https://choosealicense.com/licenses/mit/)
