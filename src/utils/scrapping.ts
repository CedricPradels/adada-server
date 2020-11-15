import puppeteer, { Browser, LaunchOptions, Page } from 'puppeteer';
import { DateTime } from 'luxon';

import { PMURaceType, RaceType } from '../types';
import { constants } from '../config/constants';

export const openBrowser = async () => {
  const herokuArgs: LaunchOptions['args'] = ['--no-sandbox'];
  const launchOptions: LaunchOptions = { args: [...herokuArgs] };

  const browser = await puppeteer.launch(launchOptions);
  return browser;
};

export const closeBrowser = async (browser: Browser) => await browser.close();

export const openPage = async (browser: Browser) => {
  const page = await browser.newPage();
  return page;
};

export const closePage = async (page: Page) => {
  await page.close();
};

export const getRacesURL = async (isoDate: string, page: Page) => {
  const baseUrl = 'https://www.pmu.fr/turf';
  const raceDate = DateTime.fromISO(isoDate, {
    zone: constants.localZone,
  }).toFormat('ddMMyyyy');
  const url = `${baseUrl}/${raceDate}`;

  await page.goto(url, { waitUntil: 'networkidle0' });

  const racesHrefs = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a.timeline-course-link'),
      (anchor) => anchor.href
    )
  );

  console.log(
    await page.evaluate(() =>
      Array.from(
        document.querySelectorAll<HTMLBodyElement>('body'),
        (body) => body.innerHTML
      )
    )
  );

  const getTail = (href: string) =>
    href
      .split('/')
      .filter((path) => /^(R|C)\d{1,2}$/.test(path))
      .join('/');
  const mergeWithUrl = (resource: string) => [url, resource].join('/');

  const racesURL = racesHrefs.map(getTail).map(mergeWithUrl);

  return racesURL;
};

export const getRunnersCount = async (racePage: Page) => {
  const runnerCount = await racePage.evaluate(
    () =>
      document.querySelectorAll(
        'tr:not(.participants-tbody-tr--non-partant) .participants-name'
      ).length || null
  );
  return runnerCount;
};

export const getRacePurse = async (racePage: Page) => {
  const headerData = await racePage.evaluate(
    () =>
      document.querySelector<HTMLElement>(
        '.course-infos-header-extras-main li:nth-child(2) strong'
      )?.innerText
  );

  const purseString = headerData?.replace(/( |€)/g, '');

  return purseString ? Number.parseInt(purseString) : null;
};

export const getRaceType = async (racePage: Page) => {
  const pMURaceType = await racePage.evaluate(
    () =>
      document.querySelector<HTMLElement>(
        '.course-infos-header-extras-main li:first-child strong'
      )?.innerText
  );

  if (!pMURaceType) return null;

  const translateType = (frenchType: PMURaceType) => {
    const translate: { [K in PMURaceType]: RaceType } = {
      'Cross Country': 'national-hunt',
      'Steeple Chase': 'steeple-chase',
      Attelé: 'harness',
      Monté: 'saddle',
      Haies: 'hurdle',
      Plat: 'flat',
    };
    return translate[frenchType];
  };
  return translateType(pMURaceType as PMURaceType);
};

export const getRaceName = async (racePage: Page) => {
  const raceName = await racePage.evaluate(() =>
    document
      .querySelector<HTMLHeadingElement>('h1.course-infos-header-title')
      ?.title.toLowerCase()
  );
  return raceName || null;
};

export const getRaceNumber = async (racePage: Page) => {
  const raceName = await racePage.evaluate(
    () =>
      document.querySelector<HTMLHeadingElement>(
        '.bandeau-nav-content-scroll-item--current .course-numero span'
      )?.innerText
  );
  const raceString = raceName?.replace('C', '');
  return raceString ? Number.parseInt(raceString) : null;
};

export const getMeetingName = async (racePage: Page) => {
  const meetingName = await racePage.evaluate(() =>
    document
      .querySelector<HTMLHeadingElement>(
        '.bandeau-nav-content-scroll-item--current .reunion-hippodrome > span'
      )
      ?.title.toLowerCase()
  );
  return meetingName || null;
};

export const getMeetingNumber = async (racePage: Page) => {
  const meetingNumber = await racePage.evaluate(
    () =>
      document.querySelector<HTMLHeadingElement>(
        '.bandeau-nav-content-scroll-item--current .reunion-numero span'
      )?.innerText
  );
  const meetingString = meetingNumber?.replace('R', '');
  return meetingString ? Number.parseInt(meetingString) : null;
};
