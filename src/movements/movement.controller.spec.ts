import {
  MovementDto,
  SearchMovementDto,
  SearchMovementsResultDto,
} from './dto';
import { Movement, MovementTypeEnum } from '../entities';
import { Test, TestingModule } from '@nestjs/testing';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { BadRequestException } from '@nestjs/common';

describe('MovementController', () => {
  let testing: MovementController;
  let service: MovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementController],
      providers: [
        {
          provide: MovementService,
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

    testing = module.get<MovementController>(MovementController);
    service = module.get<MovementService>(MovementService);
  });

  it('should be defined', () => {
    expect(testing).toBeDefined();
  });

  // it('create new user is ok', () => {
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

  //   jest
  //     .spyOn(service, 'create')
  //     .mockImplementation(() => Promise.resolve(expected));
  //   expect(testing.create(1, payload)).resolves.toEqual(expected);
  // });

  // it('create deals with throw Exception', () => {
  //   const payload: AccountDto = {
  //     name: 'test',
  //     type: accountType.CORRENTE,
  //   } as AccountDto;

  //   jest
  //     .spyOn(service, 'create')
  //     .mockRejectedValueOnce(new BadRequestException());
  //   expect(testing.create(1, payload)).rejects.toThrow();
  // });

  // it('findAll finds all users', () => {
  //   const payload: SearchAccountDto = {} as SearchAccountDto;
  //   const expected: SearchAccountsResultDto = {
  //     count: 2,
  //     accounts: [new Account(), new Account()],
  //   } as SearchAccountsResultDto;

  //   jest
  //     .spyOn(service, 'findAll')
  //     .mockImplementation(() => Promise.resolve(expected));
  //   expect(testing.findAll(1, payload)).resolves.toEqual(expected);
  // });

  // it('findOne finds a user', () => {
  //   const expected: Account = {
  //     id: 2,
  //     name: 'test',
  //     balance: 0,
  //   } as Account;

  //   jest
  //     .spyOn(service, 'findOne')
  //     .mockImplementation(() => Promise.resolve(expected));
  //   expect(testing.findOne('2')).resolves.toEqual(expected);
  // });
});
