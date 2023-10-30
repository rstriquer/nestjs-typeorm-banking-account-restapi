import { Account } from './account.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Int32,
} from 'typeorm';
import { MovementTypeEnum } from './movement-type.enum';
import { MovementStatusEnum } from './movement-status.enum';

@Entity('movements')
export class Movement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('simple-enum', {
    enum: MovementTypeEnum,
    default: MovementTypeEnum.WITHDRAW,
  })
  type: string;

  @Column('simple-enum', {
    enum: MovementStatusEnum,
    default: MovementStatusEnum.STARTED,
  })
  status: string;

  @ManyToOne((t) => Account)
  origin: number;

  @ManyToOne((t) => Account)
  destiny: number;

  // date and time of the operation
  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 50, nullable: true })
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column('int')
  userId: number;
}
