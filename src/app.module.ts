import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check';
import { AccountModule } from './account';
import { dataSourceOptions } from './providers/databases/sqlite';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      name: 'default',
    }),
    AccountModule,
    HealthCheckModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
