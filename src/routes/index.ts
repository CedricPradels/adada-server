import { Router, Request, Response } from 'express';
import swaggerUIExpress from 'swagger-ui-express';
import { DateTime } from 'luxon';
import { query, validationResult, oneOf } from 'express-validator';

import { RaceModel } from '../models';
import apiDoc from '../docs';
import { constants } from '../config';
import { RaceType, allRacesTypes } from '../types';

export const router = Router();

router.use(swaggerUIExpress.serve);

router.get('/doc', swaggerUIExpress.setup(apiDoc));

router.get('/test', (req, res) => {
  console.log(req.headers);
  res.status(200).json({ message: 'test' });
});

type RacesRequest = Request & {
  query: {
    date: string;
    minRunners?: number;
    maxRunners?: number;
    minPurse?: number;
    maxPurse?: number;
    types?: RaceType[];
  };
};

router.get(
  '/races',
  [
    query('date').isISO8601(),
    query('maxRunners').optional().isNumeric().toInt(10),
    query('minRunners').optional().isNumeric().toInt(10),
    query('minPurse').optional().isNumeric().toInt(10),
    query('maxPurse').optional().isNumeric().toInt(10),
    oneOf([
      query('types.*').optional().isIn(allRacesTypes),
      query('types').optional().isIn(allRacesTypes).toArray(),
    ]),
  ],
  async (req: RacesRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        date: queryDate,
        maxRunners,
        minRunners,
        minPurse,
        maxPurse,
        types,
      } = req.query;

      const date = DateTime.fromISO(queryDate, {
        zone: constants.localZone,
      });
      const dayStart = date.startOf('day').toISO();
      const dayEnd = date.endOf('day').toISO();

      const conditions = {
        date: { $lte: dayEnd, $gte: dayStart },
        ...(minRunners ? { runnersCount: { $gte: minRunners } } : {}),
        ...(maxRunners ? { runnersCount: { $lte: maxRunners } } : {}),
        ...(minPurse ? { purse: { $gte: minPurse } } : {}),
        ...(maxPurse ? { purse: { $lte: maxPurse } } : {}),
        ...(types && types.length > 0 ? { type: { $in: types } } : {}),
      };

      const queryRace = await RaceModel.find(conditions);

      if (queryRace.length === 0) return res.status(204).send();

      res.status(200).json(queryRace);
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  }
);
