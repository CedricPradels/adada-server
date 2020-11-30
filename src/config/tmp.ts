import Axios from 'axios';
import { constants } from '../config';
import {
  openBrowser,
  openPage,
  closePage,
  getRacesURL,
} from '../utils/scrapping';

export const tmp = async () => {
  const browser = await openBrowser();
  const page = await openPage(browser);

  await page.goto(`${constants.serverURL}/test`, { waitUntil: 'networkidle0' });

  setInterval(() => getRacesURL('2020-11-29', page), 5000);

  await closePage(page);
};
