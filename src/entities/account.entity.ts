import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AccountTypeEnum } from './account-type.enum';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('simple-enum', {
    enum: AccountTypeEnum,
    default: AccountTypeEnum.CORRENTE,
  })
  type: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balance: number;
}
