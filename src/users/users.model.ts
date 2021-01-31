import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  userName: string;
  userConfig: UserConfigItem[];
  key: string;
}

export interface UserConfigItem {
  id: string;
  defaultIssue: string;
  defaultComment: string;
  category: string;
}
