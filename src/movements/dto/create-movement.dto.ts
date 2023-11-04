import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  IsPositive,
  IsDecimal,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateMovementDto {
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
  @IsInt()
  @Min(1)
  @IsPositive()
  @IsOptional()
  destiny: number;

  @ApiProperty({
    description:
      'String with the amount being changed in the account. Could be positive or negative. Must be passed as string.',
    example: '1234.33',
  })
  @IsNotEmpty()
  @IsDecimal({ force_decimal: false, decimal_digits: '2' })
  amount: string;
}
