import { Injectable, NotFoundException } from '@nestjs/common';
import { Config } from './configs.model';

@Injectable()
export class ConfigsService {
  private configs: Config[] = [];

  // Add User
  insertUser(userId: number, mappingJson: string) {
    const configId = this.setConfigId();
    const newConfig = new Config(configId, userId, mappingJson);

    this.configs.push(newConfig);
    return configId;
  }

  // Get User
  getConfigs() {
    return [...this.configs];
  }

  getSingleConfigs(id: number) {
    const config = this.findConfig(id);

    if (!config) {
      throw new NotFoundException('Config not found');
    } else {
      return config;
    }
  }

  // Delete User
  deleteSingleUser(id: number) {
    const config = this.findConfig(id);

    if (!config) {
      throw new NotFoundException('User not found');
    } else {
      this.configs.splice(this.configs.indexOf(config), 1);
      return 'Deleted';
    }
  }

  // Update User
  updateSingleConfig(id: number, userId: number, mappingJson: string) {
    const config = this.findConfig(id);

    if (!config) {
      throw new NotFoundException('Config not found');
    } else {
      config.userId = userId;
      config.mappingJson = mappingJson;
      return [config];
    }
  }

  private findConfig(id: number): Config {
    return this.configs.find((user) => user.id === id);
  }

  private setConfigId() {
    return this.configs.length !== 0
      ? +this.configs.reduce(function (prev, current) {
          return prev.id > current.id ? prev : current;
        }).id + 1
      : 1;
  }
}
