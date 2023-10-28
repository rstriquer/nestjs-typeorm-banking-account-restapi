import { Controller, Version, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckDTO } from './health-check.dto';
import { HealthCheckService } from './health-check.service';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly service: HealthCheckService) {}

  @ApiTags('health-check')
  @ApiOperation({
    description:
      'Check the system services and reply if everything is alright.',
    summary: 'Tells whether the application is ok.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The endpoint is working as expected and provide a list of resources.',
    type: HealthCheckDTO,
  })
  @Get('/')
  @Version('1')
  @ApiBody({ type: HealthCheckDTO })
  async getHealthCheck(): Promise<HealthCheckDTO> {
    return this.service.getStatus();
  }
}
