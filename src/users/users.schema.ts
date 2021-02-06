import * as mongoose from 'mongoose';
const AutoIncrementUser = require('mongoose-sequence')(mongoose);

export const UserConfigItem = new mongoose.Schema({
  activityId: String,
  defaultIssue: String,
  defaultComment: String,
  category: String,
});

export const UsersSchema = new mongoose.Schema({
  id: Number,
  userName: String,
  userConfig: [UserConfigItem],
  userKey: String,
});

UsersSchema.plugin(AutoIncrementUser, { inc_field: 'id' });
