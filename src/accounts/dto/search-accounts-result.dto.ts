import { AccountDto } from './account.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SearchAccountsResultDto {
  @ApiProperty({
    description: 'Quantity of itens found on the list.',
  })
  count: number;

  @ApiProperty({
    description: 'List of accounts found according to the query parameters.',
    type: [AccountDto],
  })
  accounts: AccountDto[];
}
