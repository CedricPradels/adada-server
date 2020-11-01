import { query, Router } from 'express';
import swaggerUIExpress from 'swagger-ui-express';
import { DateTime } from 'luxon';
import { RaceModel } from '../models';

import {
  openBrowser,
  closeBrowser,
  openPage,
  closePage,
  getRacesURL,
  getRunnersCount,
  getAllocation,
  getDiscipline,
  getRaceName,
  getRaceNumber,
  getMeetingName,
  getMeetingNumber,
} from '../utils/scrapping';
import apiDoc from '../docs';

export const router = Router();

router.use(swaggerUIExpress.serve);

router.get('/doc', swaggerUIExpress.setup(apiDoc));

router.get('/test', (res, req) => req.status(200).json({ message: 'test' }));

router.get('/races', async (req, res) => {
  const date = DateTime.fromObject({ zone: 'Europe/Paris' }).toFormat(
    'ddMMyyyy'
  );

  // SETUP BROWSER
  const browser = await openBrowser();
  const page = await openPage(browser);

  // GET URL
  const racesURL = await getRacesURL(date, page);

  const getRacesData = await racesURL.reduce(async (acc, url) => {
    const $acc = await acc;

    await page.goto(url, { waitUntil: 'networkidle0' });

    return [
      ...$acc,
      {
        runnersCount: await getRunnersCount(page),
        url,
        allocation: await getAllocation(page),
        discipline: await getDiscipline(page),
        raceNumber: await getRaceNumber(page),
        raceName: await getRaceName(page),
        meetingNumber: await getMeetingNumber(page),
        meetingName: await getMeetingName(page),
      },
    ];
  }, [] as any);

  res.json({ data: getRacesData });

  await closePage(page);
  await closeBrowser(browser);
});
