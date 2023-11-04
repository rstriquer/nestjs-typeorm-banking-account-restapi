import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty({ description: 'Account code identification.' })
  id: number;

  @ApiProperty({ description: 'Account name.' })
  name: string;

  @ApiProperty({
    description: 'Account type. Could be: "Corrente" or "Poupança".',
  })
  type: string;

  @ApiProperty({
    description: 'Account total balance value at the time of the consulting.',
  })
  balance: number;
}
