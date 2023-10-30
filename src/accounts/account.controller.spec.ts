import {
  AccountDto,
  SearchAccountDto,
  SearchAccountsResultDto,
  UpdateAccountDto,
} from './dto';
import { Account, accountType } from '../entities';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { BadRequestException } from '@nestjs/common';

describe('AccountController', () => {
  let testing: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    testing = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(testing).toBeDefined();
  });

  it('create new user is ok', () => {
    const payload: AccountDto = {
      name: 'test',
      type: accountType.CORRENTE,
    } as AccountDto;
    const expected: Account = {
      id: 10,
      name: payload.name,
      type: payload.type,
      balance: 0,
    } as Account;

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(expected));
    expect(testing.create(payload)).resolves.toEqual(expected);
  });

  it('create deals with throw Exception', () => {
    const payload: AccountDto = {
      name: 'test',
      type: accountType.CORRENTE,
    } as AccountDto;

    jest
      .spyOn(service, 'create')
      .mockRejectedValueOnce(new BadRequestException());
    expect(testing.create(payload)).rejects.toThrow();
  });

  it('findAll finds all users', () => {
    const payload: SearchAccountDto = {} as SearchAccountDto;
    const expected: SearchAccountsResultDto = {
      count: 2,
      accounts: [new Account(), new Account()],
    } as SearchAccountsResultDto;

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(expected));
    expect(testing.findAll(payload)).resolves.toEqual(expected);
  });

  it('findOne finds a user', () => {
    const expected: Account = {
      id: 2,
      name: 'test',
      balance: 0,
    } as Account;

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(expected));
    expect(testing.findOne('2')).resolves.toEqual(expected);
  });

  it('update a user is ok', () => {
    const payload: UpdateAccountDto = {
      name: 'test',
      type: accountType.CORRENTE,
    } as UpdateAccountDto;
    const expected: Account = {
      id: 10,
      name: payload.name,
      type: payload.type,
      balance: 0,
    } as Account;

    jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve(expected));
    expect(testing.update('10', payload)).resolves.toEqual(expected);
  });

  it('remove finds a user', () => {
    const expected: Account = {
      id: 2,
      name: 'test',
      balance: 0,
    } as Account;

    jest
      .spyOn(service, 'remove')
      .mockImplementation(() => Promise.resolve(expected));
    expect(testing.remove('2')).resolves.toEqual(expected);
  });
});
