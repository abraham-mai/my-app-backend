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
import { PostUserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(@Body() newUser: PostUserDTO) {
    return this.usersService.insertUser(newUser);
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getSingleUser(@Param('id') id: string) {
    return this.usersService.getSingleUser(id);
  }

  @Delete(':id')
  deleteSingleUser(@Param('id') id: string) {
    return this.usersService.deleteSingleUser(id);
  }

  @Patch(':id')
  updateSingleUser(@Param('id') id: string, @Body() newUser: PostUserDTO) {
    return this.usersService.updateSingleUser(id, newUser);
  }
}
