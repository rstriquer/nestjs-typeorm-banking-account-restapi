import { Account, Movement } from '../entities';
import {
  CreateAccountDto,
  SearchAccountDto,
  SearchAccountsResultDto,
} from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DataSource, Repository, Like } from 'typeorm';

@Injectable()
export class AccountService {
  @InjectDataSource()
  private readonly dataSource: DataSource;

  @InjectRepository(Account, 'default')
  private readonly repository: Repository<Account>;

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

  /**
   * Delete or update lines on accounts table
   * - When the account does not have references to it in the "originId" or
   * "destinyId" columns in the "movements" table then the record is effectively
   * deleted from the table. Otherwise, the line is just TAGED as deleted in
   * the accounts table, changing its "name" field contents to "* (DELETED)"
   * @param id
   * @returns
   */
  async remove(id: number): Promise<null> {
    const account = await this.findOne(id);
    this.dataSource.manager.transaction(async (entityManager) => {
      // must await before run the count query otherwise may find many
      await entityManager.query('DELETE FROM movements WHERE userid = ' + id);
      const found = await entityManager.query(
        'SELECT count(1) as qtd FROM movements WHERE ' +
          id +
          ' IN (originId, destinyId)',
      );
      if (found[0].qtd === 0) {
        this.repository.remove(account);
        return;
      }
      this.repository.update(id, { name: '* (DELETED ACCOUNT)' });
    });
    return;
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
