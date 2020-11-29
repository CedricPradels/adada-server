import { constants } from '../config';
import { openBrowser, openPage } from '../utils/scrapping';

export const tmp = async () => {
  const browser = await openBrowser();
  const page = await openPage(browser);

  await page.goto(`${constants.serverURL}/test`, { waitUntil: 'networkidle0' });
};
