import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckDTO, StatusOptions } from './health-check.dto';
import { HealthCheckService } from './health-check.service';

describe('AppController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    controller = app.get<HealthCheckController>(HealthCheckController);
  });

  it('Should return 200 Ok', async () => {
    const result: HealthCheckDTO = {
      code: HttpStatus.OK,
      dynamodb: StatusOptions.running,
    } as HealthCheckDTO;
    expect(await controller.getHealthCheck()).toStrictEqual(result);
  });
});
