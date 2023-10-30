import { Movement, MovementStatusEnum } from '../entities';
import {
  CreateMovementDto,
  CreatePixMovementDto,
  SearchMovementDto,
  SearchMovementsResultDto,
} from './dto';
import {
  Inject,
  Injectable,
  NotFoundException,
  // BadRequestException,
  // UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateMovementDto } from './dto/update-movement.dto';
import { Repository, Like } from 'typeorm';
import { AccountService } from '../accounts';

@Injectable()
export class MovementService {
  @Inject(AccountService)
  private readonly accountService: AccountService;

  constructor(
    @InjectRepository(Movement, 'default')
    private repository: Repository<Movement>,
  ) {}

  /**
   * Validates if user is on the database and is the same as the x-user parameter
   */
  async checkAccounts(user: number, origin: number, destiny: number) {
    if (origin !== undefined) {
      await this.accountService.findOne(origin);
    }
    await this.accountService.findOne(user);
    await this.accountService.findOne(destiny);
  }

  async create(
    userId: number,
    payload: CreateMovementDto | CreatePixMovementDto,
  ): Promise<Movement> {
    const movement = {
      ...payload,
      amount: +payload.amount,
      userId: userId,
    } as Movement;

    console.log('-------------------->', payload['status']);
    if (payload['status'] === MovementStatusEnum.RECEIVED) {
      if (payload['origin'] !== undefined) {
        this.accountService.updateBalance(
          payload['origin'],
          movement.amount * -1,
        );
      }
      this.accountService.updateBalance(movement.destiny, movement.amount);
    }

    return this.repository.save(this.repository.create(movement));
  }

  async createPix(
    userId: number,
    payload: CreateMovementDto,
  ): Promise<Movement> {
    const data: CreatePixMovementDto = {
      ...payload,
      status: MovementStatusEnum.RECEIVED,
    };
    return this.create(userId, data);
  }

  async findAll(
    userId,
    payload: SearchMovementDto,
  ): Promise<SearchMovementsResultDto> {
    const where = {
      where: {},
    };
    if (payload.id !== undefined) {
      where.where['id'] = Like('%' + payload.id + '%');
    }
    if (payload.description !== undefined) {
      where.where['description'] = Like('%' + payload.description + '%');
    }
    if (payload.origin !== undefined) {
      where.where['origin'] = Like('%' + payload.origin + '%');
    }
    if (payload.destiny !== undefined) {
      where.where['destiny'] = Like('%' + payload.destiny + '%');
    }
    if (payload.type !== undefined) {
      where.where['type'] = Like('%' + payload.type + '%');
    }
    if (payload.amount !== undefined) {
      where.where['amount'] = Like('%' + payload.amount + '%');
    }
    where.where['userId'] = userId;
    const queryResults = await this.repository.find(where);
    const result: SearchMovementsResultDto = {
      count: queryResults.length,
      movements: queryResults,
    };
    return result;
  }

  async findOne(id: number): Promise<Movement> {
    const result = await this.repository.findOneBy({ id: id });
    if (result === null) {
      throw new NotFoundException();
    }
    return result;
  }
}
