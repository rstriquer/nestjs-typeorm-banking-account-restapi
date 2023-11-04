import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementDto } from './create-movement.dto';

export class UpdateAccountDto extends PartialType(CreateMovementDto) {}
