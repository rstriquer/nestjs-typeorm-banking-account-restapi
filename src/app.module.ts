import { AuthMiddleware } from './common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HealthCheckModule } from './health-check';
import { AccountModule } from './accounts';
import { MovementModule } from './movements';
import { dataSourceOptions } from './providers/databases/sqlite';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      name: 'default',
    }),
    AccountModule,
    MovementModule,
    HealthCheckModule,
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('v1/movements');
  }
}
