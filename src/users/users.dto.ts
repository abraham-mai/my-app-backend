import { UserConfigItem } from './users.model';

export class PostUserDTO {
  id: number;
  constructor(userName: string, userConfig: UserConfigItem, userKey: string) {}
}
