import { constants } from '../config';
import { openBrowser, openPage, getRacesURL } from '../utils/scrapping';

export const tmp = async () => {
  const browser = await openBrowser();
  const page = await openPage(browser);

  await page.setExtraHTTPHeaders({ connection: 'keep-alive' });
  await page.goto(`${constants.serverURL}/test`, { waitUntil: 'networkidle0' });

  const urls = await getRacesURL('2020-11-29', page);
  console.log(urls);
};
