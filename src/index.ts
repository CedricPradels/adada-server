import { startExpress, startDBConnection, startAgenda } from './config/index';

export const app = () => {
  startDBConnection();
  startAgenda();
  startExpress();
};

app();
