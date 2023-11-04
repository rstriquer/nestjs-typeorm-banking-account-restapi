import { Movement } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AccountModule } from '../accounts';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movement], 'default'), AccountModule],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}
