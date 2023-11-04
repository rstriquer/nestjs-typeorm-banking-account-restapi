import { Account } from './account.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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

  // originId: number;

  @Column({ nullable: true })
  @ManyToOne(() => Account, (account) => account.id, { eager: true })
  origin: number;

  // destinyId: number;

  @Column({ nullable: true })
  @ManyToOne(() => Account, (account) => account.id, { eager: true })
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
