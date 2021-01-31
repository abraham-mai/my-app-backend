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
import { ConfigsService } from './configs.service';

@Controller('configs')
export class ConfigsController {
  constructor(private readonly usersService: ConfigsService) {}

  @Post()
  addUser(
    @Body('userId') userId: string,
    @Body('mappingJson') mappingJson: string,
  ) {
    const generatedId = this.usersService.insertUser(
      Number(userId),
      mappingJson,
    );
    return { id: generatedId };
  }

  @Get()
  getAllConfigs() {
    return this.usersService.getConfigs();
  }

  @Get(':id')
  getSingleUser(@Param('id') id: string) {
    return this.usersService.getSingleConfigs(Number(id));
  }

  @Delete(':id')
  deleteSingleUser(@Param('id') id: string) {
    return this.usersService.deleteSingleUser(Number(id));
  }

  @Patch(':id')
  updateSingleConfig(
    @Body('userId') userId: string,
    @Body('mappingJson') mappingJson: string,
    @Param('id') id: number,
  ) {
    return this.usersService.updateSingleConfig(
      Number(id),
      Number(userId),
      mappingJson,
    );
  }
}
