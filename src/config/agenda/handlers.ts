import axios from 'axios';
import { DateTime } from 'luxon';

import {
  openBrowser,
  openPage,
  getRunnersCount,
  getRacePurse,
  getRaceType,
  getRaceName,
  getRaceNumber,
  getMeetingName,
  getMeetingNumber,
  closePage,
  closeBrowser,
  getRacesURL,
} from '../../utils/scrapping';
import { constants } from '../constants';
import { RaceModel } from '../../models';

export const selfWakeUp = async () => {
  try {
    axios.get(`${constants.serverURL}/test`);
  } catch (e) {
    console.log(e);
  }
};

export const updateRaces = async () => {
  const today = DateTime.fromObject({ zone: constants.localZone });

  const browser = await openBrowser();
  const page = await openPage(browser);

  const queryRace = await RaceModel.find({ date: today.toISO() });

  if (queryRace.length > 0) {
    await queryRace.reduce(async (acc, race) => {
      await acc;

      await page.goto(race.url, { waitUntil: 'networkidle0' });

      await race.updateOne({
        runnersCount: await getRunnersCount(page),
        purse: await getRacePurse(page),
        type: await getRaceType(page),
        raceNumber: await getRaceNumber(page),
        raceName: await getRaceName(page),
        meetingNumber: await getMeetingNumber(page),
        meetingName: await getMeetingName(page),
      });
    }, undefined as any);
  }

  if (queryRace.length === 0) {
    const racesURL = await getRacesURL(today.toISODate(), page);

    await racesURL.reduce(async (acc, url) => {
      await acc;
      await page.goto(url, { waitUntil: 'networkidle0' });

      await RaceModel.create({
        runnersCount: await getRunnersCount(page),
        url,
        date: today.toISO(),
        purse: await getRacePurse(page),
        type: await getRaceType(page),
        raceNumber: await getRaceNumber(page),
        raceName: await getRaceName(page),
        meetingNumber: await getMeetingNumber(page),
        meetingName: await getMeetingName(page),
      });
    }, undefined as any);
  }

  await closePage(page);
  await closeBrowser(browser);
};
