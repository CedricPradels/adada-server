import { openBrowser, openPage, getRacesURL } from '../utils/scrapping';

export const tmp = async () => {
  const browser = await openBrowser();
  const page = await openPage(browser);

  const urls = await getRacesURL('2020-11-29', page);
  console.log(urls);
};
