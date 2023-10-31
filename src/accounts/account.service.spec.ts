import {
  AccountDto,
  SearchAccountDto,
  SearchAccountsResultDto,
  UpdateAccountDto,
} from './dto';
import { Account, AccountTypeEnum } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

const USER_REPOSITORY_TOKEN = getRepositoryToken(Account);

describe('AccountService', () => {
  let testing: AccountService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(() => true),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    testing = module.get<AccountService>(AccountService);
    repository = module.get<Repository<Account>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(testing).toBeDefined();
  });

  it('create is working ok', () => {
    const payload: AccountDto = {
      name: 'test',
      type: AccountTypeEnum.CORRENTE,
    } as AccountDto;
    const expected: Account = {
      id: 10,
      name: payload.name,
      type: payload.type,
      balance: 0,
    } as Account;

    jest.spyOn(repository, 'create').mockImplementation(() => expected);
    jest
      .spyOn(repository, 'save')
      .mockImplementation(() => Promise.resolve(expected));
    expect(testing.create(payload)).resolves.toEqual(expected);
  });

  it('findAll is working ok', () => {
    const payload: SearchAccountDto = {
      name: 'test',
      type: AccountTypeEnum.CORRENTE,
    } as SearchAccountDto;
    const accountList = [new Account(), new Account()];
    const expected: SearchAccountsResultDto = {
      count: accountList.length,
      accounts: accountList,
    } as SearchAccountsResultDto;

    jest.spyOn(repository, 'find').mockReturnValueOnce(accountList);

    expect(testing.findAll(payload)).resolves.toEqual(expected);
  });

  it('findOne is working ok', () => {
    const expected: Account = {
      id: 10,
      name: 'test',
      type: AccountTypeEnum.CORRENTE,
      balance: 0,
    } as Account;

    jest.spyOn(repository, 'findOneBy').mockImplementation(() => expected);
    expect(testing.findOne(10)).resolves.toEqual(expected);
  });

  it('update is working ok', () => {
    const expected: Account = {
      id: 10,
      name: 'test',
      type: AccountTypeEnum.CORRENTE,
      balance: 0,
    } as Account;
    const payload: UpdateAccountDto = {
      name: expected.name,
    } as UpdateAccountDto;

    jest
      .spyOn(repository, 'save')
      .mockImplementation(() => Promise.resolve(expected));
    expect(testing.update(10, payload)).resolves.toEqual(expected);
  });
});
