import * as mongoose from 'mongoose';

const databaseUrl =
  'mongodb+srv://admin:test1235@my-backend-db.uoh7c.mongodb.net/jet_simplifier';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
  },
];
