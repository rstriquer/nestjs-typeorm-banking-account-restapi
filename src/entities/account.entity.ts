import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { accountType } from './account-type.enum';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('simple-enum', {
    enum: accountType,
    default: accountType.CORRENTE,
  })
  type: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balance: number;
}
