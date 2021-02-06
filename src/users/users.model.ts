import { Document } from 'mongoose';

export interface User extends Document {
  userName: string;
  userConfig: UserConfigItem[];
  key: string;
}

export interface UserConfigItem {
  defaultIssue: string;
  defaultComment: string;
  category: string;
}
