import { AuthMiddleware } from './common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HealthCheckModule } from './health-check';
import { AccountModule } from './accounts';
import { MovementModule } from './movements';
import { dataSourceOptions } from './providers/databases/sqlite';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        console.log(options);

        return addTransactionalDataSource(new DataSource(options));
      },
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
