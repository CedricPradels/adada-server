import mongoose from 'mongoose';

import { constants } from './constants';

export const startDBConnection = () => {
  mongoose
    .connect(constants.mongDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Db started'));
};
