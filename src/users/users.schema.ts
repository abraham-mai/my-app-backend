import * as mongoose from 'mongoose';

export const UserConfigItem = new mongoose.Schema({
  id: String,
  defaultIssue: String,
  defaultComment: String,
  category: String,
});

export const UsersSchema = new mongoose.Schema({
  id: String,
  userName: String,
  userConfig: [UserConfigItem],
  userKey: String,
});
