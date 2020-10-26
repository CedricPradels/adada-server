import { Router } from 'express';

import {
  openBrowser,
  closeBrowser,
  openPage,
  closePage,
} from '../utils/scrapping';

import swaggerUIExpress from 'swagger-ui-express';
import apiDoc from '../docs';

export const router = Router();

router.use(swaggerUIExpress.serve);

router.get('/doc', swaggerUIExpress.setup(apiDoc));

router.get('/test', async (req, res) => {
  const browser = await openBrowser();
  const page = await openPage(browser, 'https://www.google.fr');

  const someData = await page.evaluate(() => {
    const data = document.documentElement.clientWidth;
    return data;
  });

  res.json({ data: someData });

  await closePage(page);
  await closeBrowser(browser);
});
