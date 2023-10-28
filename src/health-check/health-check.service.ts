import { Injectable, HttpStatus } from '@nestjs/common';
import { HealthCheckDTO, StatusOptions } from './health-check.dto';

@Injectable()
export class HealthCheckService {
  getStatus(): HealthCheckDTO {
    const result: HealthCheckDTO = {
      code: HttpStatus.OK,
      dynamodb: StatusOptions.running,
    } as HealthCheckDTO;

    return result;
  }
}
