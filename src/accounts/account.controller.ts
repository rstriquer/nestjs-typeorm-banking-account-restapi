import { AccountDto, SearchAccountDto, SearchAccountsResultDto } from './dto';
import { BadRequestExceptionDto } from '../common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  Param,
  Version,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  // =========================================================================
  @ApiOperation({ summary: 'Add a new account to the system.' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'The endpoint is working as expected and provide a list of resources.',
    type: CreateAccountDto,
  })
  @Version('1')
  @ApiBody({ type: CreateAccountDto })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.service.create(createAccountDto);
  }

  // =========================================================================
  @ApiOperation({
    summary: 'List accounts from the system database.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The endpoint is working as expected, the account was found and the data was retrieved as expected.',
    type: SearchAccountsResultDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No account was found according to the parameters received.',
  })
  @ApiBadRequestResponse({
    description: 'One or more parameters was incorrect.',
    type: BadRequestExceptionDto,
  })
  @ApiBody({ type: SearchAccountDto })
  @Version('1')
  @Get()
  findAll(
    @Body() searchAccount: SearchAccountDto,
  ): Promise<SearchAccountsResultDto> {
    return this.service.findAll(searchAccount);
  }

  // =========================================================================
  @ApiOperation({
    summary:
      'Retrieve one account from the system database by account code identification.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The endpoint is working as expected, the account was found and the data was retrieved as expected.',
    type: SearchAccountsResultDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The account with the {id} was NOT found.',
  })
  @ApiBody({ type: AccountDto })
  @Version('1')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The identification code of the account to search for.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  // =========================================================================
  @ApiOperation({
    summary:
      'Update one account on the  system database by account code identification.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The endpoint is working as expected, the account was found and the data was updated as expected.',
    type: SearchAccountsResultDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The account with the {id} was NOT found.',
  })
  @ApiBadRequestResponse({
    description:
      'One or more parameters was not correct. More details of the error will be provided on the reply content',
    type: BadRequestExceptionDto,
  })
  @ApiBody({ type: AccountDto })
  @Version('1')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The identification code of the account to search for.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return await this.service.update(+id, updateAccountDto);
    // if (result === false) {

    // }
  }

  // =========================================================================
  @ApiOperation({
    summary: 'Delete an account from the system database.',
    description:
      'When deleting an account it deletes all its movements as well.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description:
      'The endpoint is working as expected, the account was found and successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The account with the {id} was NOT found.',
  })
  @Version('1')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The identification code of the account to delete.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
