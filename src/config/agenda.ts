import Agenda from 'agenda';
import axios from 'axios';

import { constants } from './constants';

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
};

const selfWakeup = async () => {
  try {
    axios.get(`${constants.serverURL}/test`);
  } catch (e) {
    console.log(e);
  }
};

agenda.define(actions.autoWakeUp, selfWakeup);

export const startAgenda = () => {
  (async () => {
    await agenda.start();
    await agenda.every('*/10 * * * *', actions.autoWakeUp);
  })();

  console.log('Agenda started');
};
