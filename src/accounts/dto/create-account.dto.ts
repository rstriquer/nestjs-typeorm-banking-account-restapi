import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsEnum } from 'class-validator';
import { AccountTypeEnum } from '../../entities';

export class CreateAccountDto {
  @ApiProperty({
    description:
      'Account name. MUST be at least 3 characters and could be 50 characters at max.',
  })
  @MinLength(3, {
    message: 'Account name MUST be at least 3 characters.',
  })
  @MaxLength(50, {
    message: 'Account name MUST be at maximum 50 characters.',
  })
  name: string;
  @ApiProperty({
    description:
      'Account type. Could be one of the options: "Corrente" or "Poupança".',
  })
  @IsEnum(AccountTypeEnum)
  type: string;
}
