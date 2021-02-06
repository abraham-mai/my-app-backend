import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { PostUserDTO } from './users.dto';
import { User, UserConfigItem } from './users.model';

@Injectable()
export class UsersService {
  private users = [];

  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<User>,
  ) {}

  // GET
  async findAll(): Promise<User[]> {
    return this.usersModel.find().exec();
  }

  async getSingleUser(userId: number) {
    const user = await this.usersModel.findOne({ id: userId }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  async getUserConfigByUserId(userId: number) {
    const user = await this.usersModel.findOne({ id: userId }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.userConfig;
  }
  // Delete User
  async deleteSingleUser(userId: number) {
    const user = await this.usersModel.findOneAndDelete({ id: userId }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  // Update User
  async updateSingleUser(userId: number, newUser: PostUserDTO) {
    delete newUser['_id'];
    const user = await this.usersModel
      .findOneAndUpdate({ id: userId }, newUser)
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUserConfigByUserId(
    userId: number,
    newUserConfig: UserConfigItem[],
  ) {
    const user = await this.usersModel.findOne({ id: userId }).exec();
    user.userConfig = newUserConfig;
    const updateConfig = await this.usersModel.findOneAndUpdate(
      { id: userId },
      user,
    );
    if (!updateConfig) {
      throw new NotFoundException('User not found');
    }
  }

  // POST
  async insertUser(newUser: PostUserDTO): Promise<User> {
    const createdUser = new this.usersModel(newUser);
    return createdUser.save();
  }
}
