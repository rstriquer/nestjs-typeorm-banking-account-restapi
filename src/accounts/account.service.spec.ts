import {
  AccountDto,
  SearchAccountDto,
  SearchAccountsResultDto,
  UpdateAccountDto,
} from './dto';
import { Account, AccountTypeEnum, Movement } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

const ACCOUNT_REPOSITORY_TOKEN = getRepositoryToken(Account);
const MOVEMENT_REPOSITORY_TOKEN = getRepositoryToken(Movement);

const mockEntityManager = {
  query: jest.fn(),
  remove: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(() => {
    return null;
  }),
};

const mockMovementRepository = {
  manager: mockEntityManager,
  create: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(() => true),
  remove: jest.fn(),
  delete: jest.fn(() => console.log('delete Movement')),
};

const mockAccountRepository = {
  manager: mockEntityManager,
  create: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(() => true),
  remove: jest.fn(),
  delete: jest.fn(() => console.log('delete Account')),
};

describe('AccountService', () => {
  let testing: AccountService;
  let repository: Repository<Account>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: ACCOUNT_REPOSITORY_TOKEN,
          useValue: mockAccountRepository,
        },
        {
          provide: MOVEMENT_REPOSITORY_TOKEN,
          useValue: mockMovementRepository,
        },
      ],
    }).compile();

    testing = module.get<AccountService>(AccountService);
    repository = module.get<Repository<Account>>(ACCOUNT_REPOSITORY_TOKEN);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(testing).toBeDefined();
    expect(repository).toBeDefined();
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

    jest
      .spyOn(repository, 'find')
      .mockReturnValueOnce(Promise.resolve(accountList));

    expect(testing.findAll(payload)).resolves.toEqual(expected);
  });

  it('findOne is working ok', () => {
    const expected: Account = {
      id: 10,
      name: 'test',
      type: AccountTypeEnum.CORRENTE,
      balance: 0,
    } as Account;

    jest
      .spyOn(repository, 'findOneBy')
      .mockImplementation(() => Promise.resolve(expected));
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

  it('remove with NO movement is working ok', async () => {
    const expected: Account = {
      id: 10,
      name: 'test',
      type: AccountTypeEnum.CORRENTE,
      balance: 0,
    } as Account;

    jest
      .spyOn(testing, 'findOne') // findOne should be tested in another test
      .mockImplementation(() => Promise.resolve(expected));

    jest
      .spyOn(mockEntityManager, 'query')
      .mockImplementation(() => Promise.resolve([{ qtd: 0 }]));

    const spyMovementDelete = jest
      .spyOn(mockMovementRepository, 'delete')
      .mockImplementation(() => {
        Promise.resolve(null);
      });

    const spyAccountDelete = jest
      .spyOn(mockAccountRepository, 'delete')
      .mockImplementation(() => {
        Promise.resolve(null);
      });

    const spyAccountUpdate = jest
      .spyOn(mockAccountRepository, 'update')
      .mockImplementation(() => {
        Promise.resolve(null);
      });

    await testing.remove(10);

    expect(spyAccountDelete).toHaveBeenCalledTimes(1);
    expect(spyMovementDelete).toHaveBeenCalledTimes(1);
    expect(spyAccountUpdate).toHaveBeenCalledTimes(0);
  });

  it('remove with movement is working ok', async () => {
    const expected: Account = {
      id: 11,
      name: 'test',
      type: AccountTypeEnum.CORRENTE,
      balance: 0,
    } as Account;

    jest
      .spyOn(testing, 'findOne') // findOne should be tested in another test
      .mockImplementation(() => Promise.resolve(expected));

    jest
      .spyOn(mockEntityManager, 'query')
      .mockImplementation(() => Promise.resolve([{ qtd: 100 }]));

    const spyMovementDelete = jest
      .spyOn(mockMovementRepository, 'delete')
      .mockImplementation(() => {
        Promise.resolve(null);
      });

    const spyAccountDelete = jest
      .spyOn(mockAccountRepository, 'delete')
      .mockImplementation(() => {
        Promise.resolve(null);
      });

    const spyAccountUpdate = jest
      .spyOn(mockAccountRepository, 'update')
      .mockImplementation(() => {
        Promise.resolve(null);
      });

    await testing.remove(11);

    expect(spyAccountDelete).toHaveBeenCalledTimes(0);
    expect(spyMovementDelete).toHaveBeenCalledTimes(1);
    expect(spyAccountUpdate).toHaveBeenCalledTimes(1);
  });
});
