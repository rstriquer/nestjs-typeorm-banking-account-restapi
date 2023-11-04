import { Movement } from '../../entities';
import { MovementDto } from './movement.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SearchMovementsResultDto {
  @ApiProperty({
    description: 'Quantity of itens found on the list.',
  })
  count: number;

  @ApiProperty({
    description: 'List of accounts found according to the query parameters.',
    type: [MovementDto],
  })
  movements: Movement[];
}
