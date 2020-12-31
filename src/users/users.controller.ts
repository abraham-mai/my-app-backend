import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(
    @Body('username') userName: string,
    @Body('config-id') configId: number,
    @Body('key') key: string,
  ) {
    const generatedId = this.usersService.insertUser(userName, configId, key);
    return { id: generatedId };
  }

  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getSingleUser(@Param('id') id: string) {
    return this.usersService.getSingleUser(Number(id));
  }

  @Delete(':id')
  deleteSingleUser(@Param('id') id: string) {
    return this.usersService.deleteSingleUser(Number(id));
  }

  @Patch(':id')
  updateSingleUser(
    @Body('username') userName: string,
    @Body('config-id') configId: number,
    @Body('key') key: string,
    @Param('id') id: string,
  ) {
    return this.usersService.updateSingleUser(
      Number(id),
      userName,
      configId,
      key,
    );
  }
}
