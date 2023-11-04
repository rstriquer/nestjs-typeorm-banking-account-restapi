import { Account, AccountTypeEnum } from '../entities';
import { AccountDto, SearchAccountsResultDto, UpdateAccountDto } from './dto';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('AccountModule', () => {
  let app: INestApplication;

  const setupModule = async (mock): Promise<TestingModule> => {
    return await Test.createTestingModule({
      imports: [
        {
          module: class AccountModule {},
          providers: [
            {
              provide: AccountService,
              useValue: {
                create: jest.fn(),
                findAll: jest.fn(() => {
                  return {
                    count: 2,
                    accounts: [
                      {
                        id: 1,
                        name: 'test 1',
                        type: AccountTypeEnum.CORRENTE,
                        balance: 0,
                      },
                      {
                        id: 2,
                        name: 'test 2',
                        type: AccountTypeEnum.CORRENTE,
                        balance: 0,
                      },
                    ],
                  } as SearchAccountsResultDto;
                }),
                findOne: jest.fn((id) => {
                  return {
                    id: id,
                    name: 'test',
                    type: AccountTypeEnum.CORRENTE,
                    balance: 0,
                  } as Account;
                }),
                update: jest.fn(),
                remove: jest.fn(),
              },
            },
          ],
        },
      ],
    }).compile();
  };

  const buildTestApp = async (): Promise<void> => {
    const moduleRef = await setupModule(true);
    app = moduleRef.createNestApplication();
    app.init();
  };

  afterEach(async () => {
    await app.close();
  });

  it('POST /v1/accounts (create)', async () => {
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

    await buildTestApp();

    request(app.getHttpServer())
      .post('/v1/accounts')
      .send(payload)
      .expect((response: request.Response) => {
        expect(response.body).toBe(Account);
        expect(response.body).toEqual(expected);
      })
      .expect(HttpStatus.CREATED);
  });

  it('GET /v1/accounts (findAll)', async () => {
    const expected = {
      count: 2,
      accounts: [
        {
          id: 1,
          name: 'test 1',
          type: AccountTypeEnum.CORRENTE,
          balance: 0,
        },
        {
          id: 2,
          name: 'test 2',
          type: AccountTypeEnum.CORRENTE,
          balance: 0,
        },
      ],
    } as SearchAccountsResultDto;

    await buildTestApp();

    request(app.getHttpServer())
      .get('/v1/accounts')
      .send()
      .expect((response: request.Response) => {
        expect(response.body).toBe(Account);
        expect(response.body).toEqual(expected);
      })
      .expect(HttpStatus.OK);
  });

  it('GET /v1/accounts/1 (findOne)', async () => {
    const expected: Account = {
      id: 10,
      name: 'test',
      type: AccountTypeEnum.CORRENTE,
      balance: 0,
    } as Account;

    await buildTestApp();

    request(app.getHttpServer())
      .get('/v1/accounts/1')
      .send()
      .expect((response: request.Response) => {
        expect(response.body).toBe(Account);
        expect(response.body).toEqual(expected);
      })
      .expect(HttpStatus.OK);
  });

  it('PATCH /v1/accounts/1 (update)', async () => {
    const payload: UpdateAccountDto = {
      name: 'test',
    } as UpdateAccountDto;
    const expected: Account = {
      id: 10,
      name: payload.name,
      type: payload.type,
      balance: 0,
    } as Account;

    await buildTestApp();

    request(app.getHttpServer())
      .patch('/v1/accounts')
      .send(payload)
      .expect((response: request.Response) => {
        expect(response.body).toBe(UpdateAccountDto);
        expect(response.body).toEqual(expected);
      })
      .expect(HttpStatus.OK);
  });

  it('GET /v1/accounts/1 (findOne)', async () => {
    await buildTestApp();

    request(app.getHttpServer())
      .delete('/v1/accounts/1')
      .send()
      .expect((response: request.Response) => {
        expect(response.body).toEqual('');
      })
      .expect(HttpStatus.NO_CONTENT);
  });
});
