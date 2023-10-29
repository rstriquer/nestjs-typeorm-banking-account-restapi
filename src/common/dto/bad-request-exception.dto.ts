import { ApiProperty } from '@nestjs/swagger';

export class BadRequestExceptionDto {
  @ApiProperty({
    description: 'An array with the error messages.',
  })
  id: string[];

  @ApiProperty({ description: 'The HTTP Error description.' })
  error: string;

  @ApiProperty({
    description: 'The HTTP Error code identification.',
  })
  statusCode: number;
}
