import { ApiProperty } from '@nestjs/swagger';

export enum StatusOptions {
  running = 'Running',
  halt = 'Halt',
}

export class HealthCheckDTO {
  @ApiProperty({
    description:
      'The server situation. Uses the same codes of HTTP CODE responses.',
  })
  code: number;

  @ApiProperty({
    description: 'Describe the DynamoDB situation.',
    enum: StatusOptions,
  })
  dynamodb: StatusOptions;
}
