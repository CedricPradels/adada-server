import puppeteer, { Browser, LaunchOptions, Page } from 'puppeteer';

export const openBrowser = async () => {
  const herokuOption: LaunchOptions = { args: ['--no-sandbox'] };
  const launchOptions: LaunchOptions = { ...herokuOption };

  const browser = await puppeteer.launch(launchOptions);
  return browser;
};

export const closeBrowser = async (browser: Browser) => await browser.close();

export const openPage = async (browser: Browser, url: string) => {
  const page = await browser.newPage();
  await page.goto(url);
  return page;
};

export const closePage = async (page: Page) => {
  await page.close();
};
