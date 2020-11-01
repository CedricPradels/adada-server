import { config } from 'dotenv';

config();

export const constants = {
  port: process.env.PORT || 4000,
  mongDBURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/adada',
};
