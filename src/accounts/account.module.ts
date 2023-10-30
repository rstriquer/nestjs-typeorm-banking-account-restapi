import { Account } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([Account], 'default')],
  exports: [AccountService],
})
export class AccountModule {}
