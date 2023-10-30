import {
  MovementDto,
  SearchMovementDto,
  SearchMovementsResultDto,
} from './dto';
import { BadRequestExceptionDto } from '../common';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Version,
  Headers,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { MovementService } from './movement.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@ApiTags('movements')
@Controller('movements')
export class MovementController {
  constructor(private readonly service: MovementService) {}

  // =========================================================================
  @ApiOperation({ summary: 'Add a new movement to the system.' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'The endpoint is working as expected and a new movement was created.',
    type: CreateMovementDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Bad Request. The "x-user" user was missing in the query HEADERS.',
    type: CreateMovementDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Unauthorized. The "x-user" header identification and the "origin" field identification are NOT the same!',
    type: CreateMovementDto,
  })
  @Version('1')
  @ApiBody({ type: CreateMovementDto })
  @Post()
  async create(
    @Headers('x-user') userId: number,
    @Body() payload: CreateMovementDto,
  ) {
    this.checkAuthorization(userId, payload['origin']);

    await this.service.checkAccounts(
      userId,
      payload['origin'],
      payload['destiny'],
    );
    return this.service.create(userId, payload);
  }

  // =========================================================================
  @ApiOperation({
    summary: 'Add a new movement to the system by PIX operation.',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'The endpoint is working as expected and a new movement was created.',
    type: CreateMovementDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Bad Request. The "x-user" user was missing in the query HEADERS.',
    type: CreateMovementDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Unauthorized. The "x-user" header identification and the "origin" field identification are NOT the same!',
    type: CreateMovementDto,
  })
  @Version('1')
  @ApiBody({ type: CreateMovementDto })
  @Post('pix')
  async createPix(
    @Headers('x-user') userId: number,
    @Body() payload: CreateMovementDto,
  ) {
    this.checkAuthorization(userId, payload['origin']);

    await this.service.checkAccounts(
      userId,
      payload['origin'],
      payload['destiny'],
    );
    return await this.service.createPix(userId, payload);
  }

  // =========================================================================
  @ApiOperation({
    summary: 'List movements from the system database.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The endpoint is working as expected, the account was found and the data was retrieved as expected.',
    type: SearchMovementsResultDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No account was found according to the parameters received.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Bad Request. The "x-user" user was missing in the query HEADERS.',
    type: CreateMovementDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Unauthorized. The "x-user" header identification and the "origin" field identification are NOT the same!',
    type: CreateMovementDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more parameters was incorrect.',
    type: BadRequestExceptionDto,
  })
  @ApiBody({ type: SearchMovementDto })
  @Version('1')
  @Get()
  async findAll(
    @Headers('x-user') userId: number,
    @Body() payload: SearchMovementDto,
  ): Promise<SearchMovementsResultDto> {
    await this.service.checkAccounts(
      userId,
      payload['origin'],
      payload['destiny'],
    );

    return this.service.findAll(userId, payload);
  }

  // =========================================================================
  @ApiOperation({
    summary:
      'Retrieve one movement from the system database by movement code identification.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The endpoint is working as expected, the movement was found and the data was retrieved as expected.',
    type: SearchMovementsResultDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The movement with the {id} was NOT found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Bad Request. The "x-user" user was missing in the query HEADERS.',
    type: CreateMovementDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Unauthorized. The "x-user" header identification and the "origin" field identification are NOT the same!',
    type: CreateMovementDto,
  })
  @ApiBody({ type: MovementDto })
  @Version('1')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The identification code of the movement to search for.',
  })
  @Get(':id')
  async findOne(@Headers('x-user') userId: number, @Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  checkAuthorization(userId: number, origin: number) {
    if (origin !== undefined && userId != origin) {
      throw new UnauthorizedException();
    }
  }
}
