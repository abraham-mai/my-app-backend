import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { PostUserDTO } from './users.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private users = [];

  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<User>,
  ) {}

  // Get User
  getUsers() {
    return [...this.users];
  }

  getSingleUser(id: string) {
    return this.usersModel.find((x) => x.id === id).exec();
  }

  // Delete User
  deleteSingleUser(id: string) {
    const user = this.findUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      this.users.splice(this.users.indexOf(user), 1);
      return 'Deleted';
    }
  }

  // Update User
  updateSingleUser(id: string, newUser: PostUserDTO) {
    const user = this.findUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      const createdUser = new this.usersModel(newUser);
      return createdUser.save();
    }
  }

  private findUser(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  // Add user with mongoose
  async insertUser(newUser: PostUserDTO): Promise<User> {
    const createdUser = new this.usersModel(newUser);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.usersModel.find().exec();
  }
}
