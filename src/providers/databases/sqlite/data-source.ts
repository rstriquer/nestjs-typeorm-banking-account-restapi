import { DataSource, DatabaseType, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ['dist/src/entities/*.entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
