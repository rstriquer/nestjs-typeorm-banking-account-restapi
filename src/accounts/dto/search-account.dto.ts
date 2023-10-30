import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { accountType } from '../../entities';

export class SearchAccountDto {
  @ApiProperty({
    description:
      'Account code identification. Could be used partial numbers. Ex: 10 will return all records with 10 such as 100 and 1000.',
  })
  @IsOptional()
  id: number;
  @ApiProperty({ description: 'Account name.' })
  @IsOptional()
  name: string;
  @ApiProperty({
    description:
      'Account type. Could be: "Corrente" or "Poupança". Could be used partial values. Ex: "o" will return all records with both "Corrente" and "Poupança".',
  })
  @IsOptional()
  type: accountType;
}
