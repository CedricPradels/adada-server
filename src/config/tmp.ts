import {
  openBrowser,
  openPage,
  closePage,
  getRacesURL,
} from '../utils/scrapping';

export const tmp = async () => {
  const browser = await openBrowser();
  const page = await openPage(browser);

  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);
  await getRacesURL('2020-12-01', page);

  closePage(page);
};
