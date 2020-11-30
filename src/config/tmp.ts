import {
  openBrowser,
  openPage,
  closePage,
  getRacesURL,
} from '../utils/scrapping';

export const tmp = async () => {
  const browser = await openBrowser();
  const page = await openPage(browser);

  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);
  await getRacesURL('2020-11-30', page);

  closePage(page);
};
