import { config } from 'dotenv';

config();

const PORT = '4000';

export const constants = {
  port: process.env.PORT || PORT,
  mongDBURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/adada',
  serverURL: process.env.SERVER_URL || `http://localhost:${PORT}`,
  localZone: 'Europe/Paris',
};
