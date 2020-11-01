import { startExpress, startDBConnection, startAgenda } from './config/index';

startDBConnection();
startAgenda();
startExpress();
