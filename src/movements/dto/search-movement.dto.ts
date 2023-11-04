import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsInt,
  Min,
  IsDecimal,
} from 'class-validator';
import { MovementTypeEnum } from '../../entities';

export class SearchMovementDto {
  @ApiProperty({
    description:
      'Account code identification. Could be used partial numbers. Ex: 10 will return all records with 10 such as 100 and 1000.',
  })
  @IsOptional()
  id: number;

  @ApiProperty({
    description: 'Movement description.',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description:
      'Identification Code of the origin account of the movement. May be null.',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  origin: number;

  @ApiProperty({
    description:
      'Identification Code of the destination account of the movement.',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @IsPositive()
  destiny: number;

  @ApiProperty({
    description: 'Movement type. Could be: "Deposito" or "Saque".',
  })
  @IsOptional()
  type: MovementTypeEnum;

  @ApiProperty({
    description:
      'String with the amount being changed in the account. Could be positive or negative. Must be passed as string.',
    example: '1234.33',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDecimal({ force_decimal: false, decimal_digits: '2' })
  amount: string;
}
