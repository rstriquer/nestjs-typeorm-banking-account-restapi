import { Movement, MovementStatusEnum, MovementTypeEnum } from '../entities';
import { CreateMovementDto, SearchMovementsResultDto } from './dto';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovementService } from './movement.service';

describe('MovementModule', () => {
  let app: INestApplication;

  const setupModule = async (mock): Promise<TestingModule> => {
    return await Test.createTestingModule({
      imports: [
        {
          module: class MovementModule {},
          providers: [
            {
              provide: MovementService,
              useValue: {
                create: jest.fn((payload) => {
                  return {
                    ...payload,
                    id: 10,
                    type: MovementTypeEnum.WITHDRAW,
                    status: MovementStatusEnum.STARTED,
                    createdAt: new Date('2023-10-30T19:55:11.000Z'),
                  } as Movement;
                }),
                findAll: jest.fn(() => {
                  return {
                    count: 2,
                    movements: [
                      {
                        id: 1,
                        type: MovementTypeEnum.WITHDRAW,
                      },
                      {
                        id: 2,
                        type: MovementTypeEnum.WITHDRAW,
                      },
                    ],
                  } as SearchMovementsResultDto;
                }),
                findOne: jest.fn((id) => {
                  return {
                    id: id,
                  } as Movement;
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

  it('POST /v1/movements (create)', async () => {
    const payload: CreateMovementDto = {
      origin: 1,
      destiny: 2,
      amount: '10',
    } as CreateMovementDto;
    const expected: Movement = {
      amount: 10,
      userId: 1,
      origin: 1,
      destiny: 2,
      description: null,
      id: 10,
      type: MovementTypeEnum.WITHDRAW,
      status: MovementStatusEnum.STARTED,
      createdAt: new Date('2023-10-30T19:55:11.000Z'),
    } as Movement;

    await buildTestApp();

    request(app.getHttpServer())
      .post('/v1/movements')
      .send(payload)
      .expect((response: request.Response) => {
        expect(response.body).toBe(Movement);
        expect(response.body).toEqual(expected);
      })
      .expect(HttpStatus.CREATED);
  });

  // it('GET /v1/movements (findAll)', async () => {
  //   const expected = {
  //     count: 2,
  //     movements: [
  //       {
  //         id: 1,
  //         name: 'test 1',
  //         type: movementType.CORRENTE,
  //         balance: 0,
  //       },
  //       {
  //         id: 2,
  //         name: 'test 2',
  //         type: movementType.CORRENTE,
  //         balance: 0,
  //       },
  //     ],
  //   } as SearchMovementsResultDto;

  //   await buildTestApp();

  //   request(app.getHttpServer())
  //     .get('/v1/movements')
  //     .send()
  //     .expect((response: request.Response) => {
  //       expect(response.body).toBe(Account);
  //       expect(response.body).toEqual(expected);
  //     })
  //     .expect(HttpStatus.OK);
  // });

  // it('GET /v1/movements/1 (findOne)', async () => {
  //   await buildTestApp();

  //   request(app.getHttpServer())
  //     .delete('/v1/movements/1')
  //     .send()
  //     .expect((response: request.Response) => {
  //       expect(response.body).toEqual('');
  //     })
  //     .expect(HttpStatus.NOT_FOUND);
  // });
});
