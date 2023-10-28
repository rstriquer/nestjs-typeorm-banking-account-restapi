import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from './health-check.service';
import { HealthCheckDTO, StatusOptions } from './health-check.dto';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckService],
    }).compile();

    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return 200 Ok', async () => {
    const result: HealthCheckDTO = {
      code: HttpStatus.OK,
      dynamodb: StatusOptions.running,
    } as HealthCheckDTO;
    expect(await service.getStatus()).toStrictEqual(result);
  });
});
