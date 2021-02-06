import { Document } from 'mongoose';

export interface User extends Document {
  userName: string;
  userConfig: UserConfigItem[];
  key: string;
}

export interface UserConfigItem {
  activityId: String;
  defaultIssue: string;
  defaultComment: string;
  category: string;
}

export enum UserConfigCategories {
  implementation = 'implementierung',
  test = 'test',
  organizing = 'planung',
}
