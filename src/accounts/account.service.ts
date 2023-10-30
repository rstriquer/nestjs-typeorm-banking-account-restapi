import { Account } from '../entities';
import {
  CreateAccountDto,
  SearchAccountDto,
  SearchAccountsResultDto,
} from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Repository, Like } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account, 'default')
    private repository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const payload = {
      ...createAccountDto,
    };
    const account = this.repository.create(payload);
    return this.repository.save(account);
  }

  async findAll(
    searchAccount: SearchAccountDto,
  ): Promise<SearchAccountsResultDto> {
    const where = {
      where: {},
    };
    if (searchAccount.id !== undefined) {
      where.where['id'] = Like('%' + searchAccount.id + '%');
    }
    if (searchAccount.name !== undefined) {
      where.where['name'] = Like('%' + searchAccount.name + '%');
    }
    if (searchAccount.type !== undefined) {
      where.where['type'] = Like('%' + searchAccount.type + '%');
    }
    const queryResults = await this.repository.find(where);
    const result: SearchAccountsResultDto = {
      count: queryResults.length,
      accounts: queryResults,
    };
    return result;
  }

  async findOne(id: number): Promise<Account> {
    const result = await this.repository.findOneBy({ id: id });
    if (result === null) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account | boolean> {
    await this.findOne(id);

    const payload = {
      id: id,
      ...updateAccountDto,
    };
    return this.repository.save(payload);
  }

  async remove(id: number): Promise<Account> {
    const account = await this.findOne(id);
    return this.repository.remove(account);
  }

  /**
   * Update the balance field of an account on the system
   * @param id
   * @param value May be positive of negative value;
   */
  async updateBalance(id: number, value: number) {
    const account: Account = await this.findOne(id);
    account.balance += value;
    return this.repository.save(account);
  }
}
