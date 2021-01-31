import { Connection } from 'mongoose';
import { UsersSchema } from './users.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
