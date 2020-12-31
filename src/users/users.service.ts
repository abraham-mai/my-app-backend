import { Injectable, NotFoundException } from '@nestjs/common';
import { config } from 'process';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  // Add User
  insertUser(userName: string, configId: number, key: string) {
    const userId = this.setUserId();
    const newUser = new User(userId, userName, configId, key);

    this.users.push(newUser);
    return userId;
  }

  // Get User
  getUsers() {
    return [...this.users];
  }

  getSingleUser(id: number) {
    const user = this.findUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  // Delete User
  deleteSingleUser(id: number) {
    const user = this.findUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      this.users.splice(this.users.indexOf(user), 1);
      return 'Deleted';
    }
  }

  // Update User
  updateSingleUser(
    id: number,
    userName: string,
    configId: number,
    key: string,
  ) {
    const user = this.findUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      user.userName = userName;
      user.configId = configId;
      user.key = key;
      return [user];
    }
  }

  private findUser(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  private setUserId() {
    return this.users.length !== 0
      ? +this.users.reduce(function (prev, current) {
          return prev.id > current.id ? prev : current;
        }).id + 1
      : 1;
  }
}
