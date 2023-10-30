import { ApiProperty } from '@nestjs/swagger';

export class MovementDto {
  @ApiProperty({ description: 'Movement code identification.' })
  id: number;

  @ApiProperty({ description: 'Movement name.' })
  name: string;

  @ApiProperty({
    description: 'Movement type. Could be: "Corrente" or "Poupança".',
  })
  type: string;

  @ApiProperty({
    description: 'Movement total balance value at the time of the consulting.',
  })
  balance: number;
}
