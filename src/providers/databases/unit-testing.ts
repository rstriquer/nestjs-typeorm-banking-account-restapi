import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
initializeTransactionalContext();

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  name: 'default',
  // database: process.env.DB_DATABASE + '.temp-test-file',
  database: ':memory:',
  // dropSchema: true,
  entities: ['dist/src/entities/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: true,
};

export const dataSource = new DataSource(dataSourceOptions);
dataSource.createQueryRunner().connect();

addTransactionalDataSource(dataSource);
