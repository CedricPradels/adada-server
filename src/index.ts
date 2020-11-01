import { startExpress, startDBConnection } from './config/index';

startDBConnection();
startExpress();
