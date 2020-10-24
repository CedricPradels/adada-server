import { config } from 'dotenv';

config();

export const constants = {
  port: process.env.PORT || 4000,
};
