import { ApiProperty } from '@nestjs/swagger';
import { MovementTypeEnum, MovementStatusEnum } from '../../entities';
import { IsOptional } from 'class-validator';

export class MovementDto {
  @ApiProperty({ description: 'Movement code identification.' })
  id: number;

  @ApiProperty({ description: 'Movement type. MUST be "Deposito" or "Saque".' })
  type: MovementTypeEnum;

  @ApiProperty({
    description:
      'Movement status. ' +
      'MUST be "Started", "Received" or "Done". ' +
      'Only "Received" and "Done" movements will be summed to account balance.',
  })
  status: MovementStatusEnum;

  @ApiProperty({
    description:
      'The account identification that originates the movement. ' +
      'May not be present if the movement origin are not registered on the system.',
  })
  @IsOptional()
  origin: number;

  @ApiProperty({
    description:
      'The account identification to where the movement transferred value to. ' +
      'May not be present if the destination where the movement will be transferred to is not from the system.',
  })
  @IsOptional()
  destiny: number;

  @ApiProperty({
    description: 'The date and time recorded when the movement ocurred.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Some annotation. May be null if there is no content.',
  })
  description: string;

  @ApiProperty({
    description: 'Movement value to be transferred.',
  })
  amount: number;

  @ApiProperty({
    description: 'The user identification code that realizes the movement.',
  })
  userId: number;
}
