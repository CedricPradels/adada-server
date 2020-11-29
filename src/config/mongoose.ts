import mongoose from 'mongoose';

import { constants } from './constants';

export const startDBConnection = async () => {
  await mongoose.connect(constants.mongDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database started');
};
