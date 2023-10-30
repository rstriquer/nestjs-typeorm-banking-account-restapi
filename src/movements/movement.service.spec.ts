import {
  MovementDto,
  SearchMovementDto,
  SearchMovementsResultDto,
} from './dto';
import { Movement, MovementType } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { MovementService } from './movement.service';

const USER_REPOSITORY_TOKEN = getRepositoryToken(Account);

describe('MovementService', () => {
  let testing: MovementService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementService,
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

    testing = module.get<MovementService>(MovementService);
    repository = module.get<Repository<Account>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(testing).toBeDefined();
  });

  // it('create is working ok', () => {
  //   const payload: AccountDto = {
  //     name: 'test',
  //     type: accountType.CORRENTE,
  //   } as AccountDto;
  //   const expected: Account = {
  //     id: 10,
  //     name: payload.name,
  //     type: payload.type,
  //     balance: 0,
  //   } as Account;

  //   jest.spyOn(repository, 'create').mockImplementation(() => expected);
  //   jest
  //     .spyOn(repository, 'save')
  //     .mockImplementation(() => Promise.resolve(expected));
  //   expect(testing.create(1, payload)).resolves.toEqual(expected);
  // });

  // it('findAll is working ok', () => {
  //   const payload: SearchAccountDto = {
  //     name: 'test',
  //     type: accountType.CORRENTE,
  //   } as SearchAccountDto;
  //   const accountList = [new Account(), new Account()];
  //   const expected: SearchAccountsResultDto = {
  //     count: accountList.length,
  //     accounts: accountList,
  //   } as SearchAccountsResultDto;

  //   jest.spyOn(repository, 'find').mockReturnValueOnce(accountList);

  //   expect(testing.findAll(1, payload)).resolves.toEqual(expected);
  // });

  // it('findOne is working ok', () => {
  //   const expected: Account = {
  //     id: 10,
  //     name: 'test',
  //     type: accountType.CORRENTE,
  //     balance: 0,
  //   } as Account;

  //   jest.spyOn(repository, 'findOneBy').mockImplementation(() => expected);
  //   expect(testing.findOne(10)).resolves.toEqual(expected);
  // });
});
