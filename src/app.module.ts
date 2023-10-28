import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check';
import { dataSourceOptions } from './providers/databases/sqlite';

@Module({
  imports: [HealthCheckModule, TypeOrmModule.forRoot(dataSourceOptions)],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
