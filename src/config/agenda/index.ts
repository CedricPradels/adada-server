import Agenda from 'agenda';

import { constants } from '../constants';
import { selfWakeUp, updateRaces } from './handlers';

const agenda = new Agenda({
  db: {
    address: constants.mongDBURI,
    options: {
      useUnifiedTopology: true,
    },
  },
  processEvery: '30 seconds',
});

const actions = {
  autoWakeUp: 'Wakeup server',
  updateRaces: 'Update or create races',
};

agenda.define(actions.autoWakeUp, selfWakeUp);
agenda.define(actions.updateRaces, updateRaces);

export const startAgenda = () => {
  (async () => {
    await agenda.start();
    await agenda.every('*/10 * * * *', actions.updateRaces);
    await agenda.every('*/5 * * * *', actions.autoWakeUp);
  })();

  console.log('Agenda started');
};
