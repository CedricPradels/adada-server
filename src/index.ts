import { startExpress, startDBConnection, startAgenda } from './config/index';

import { tmp } from './config/tmp';

export const app = async () => {
  await startDBConnection();
  startExpress();
  await startAgenda();
  await tmp();
};

app();
