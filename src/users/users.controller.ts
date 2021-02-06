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
import { UserConfigItem } from './users.model';
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
  getSingleUser(@Param('id') id: number) {
    return this.usersService.getSingleUser(id);
  }

  @Delete(':id')
  deleteSingleUser(@Param('id') id: number) {
    return this.usersService.deleteSingleUser(id);
  }

  @Patch(':id')
  updateSingleUser(@Param('id') id: string, @Body() newUser: PostUserDTO) {
    return this.usersService.updateSingleUser(Number(id), newUser);
  }

  @Put(':id/config')
  updateUserConfigByUserId(
    @Param('id') id: string,
    @Body() userConfigArray: UserConfigItem[],
  ) {
    return this.usersService.updateUserConfigByUserId(
      Number(id),
      userConfigArray,
    );
  }

  @Get(':id/config')
  getUserConfigByUserId(@Param('id') id: string) {
    return this.usersService.getUserConfigByUserId(Number(id));
  }
}
