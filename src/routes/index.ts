import { Router } from 'express';
import swaggerUIExpress from 'swagger-ui-express';
import { DateTime } from 'luxon';

import { RaceModel } from '../models';
import apiDoc from '../docs';
import { constants } from '../config';

export const router = Router();

router.use(swaggerUIExpress.serve);

router.get('/doc', swaggerUIExpress.setup(apiDoc));

router.get('/test', (res, req) => req.status(200).json({ message: 'test' }));

router.get('/races', async (req, res) => {
  const {
    date: queryDate,
    maxRunners: queryMaxRunners,
    minRunners: queryMinRunners,
    minPurse: queryMinPurse,
    maxPurse: queryMaxPurse,
    types: queryTypes,
  } = req.query;

  const date = DateTime.fromISO(queryDate as string, {
    zone: constants.localZone,
  });
  const dayStart = date.startOf('day').toISO();
  const dayEnd = date.endOf('day').toISO();

  const maxRunners = Number(queryMaxRunners) || Number.MAX_VALUE;
  const minRunners = Number(queryMinRunners) || 0;

  const maxPurse = Number(queryMaxPurse) || Number.MAX_VALUE;
  const minPurse = Number(queryMinPurse) || 0;

  const types =
    (Array.isArray(queryTypes) && queryTypes) ||
    (typeof queryTypes === 'string' && [queryTypes]) ||
    [];

  const queryRace = await RaceModel.find({
    date: { $lte: dayEnd, $gte: dayStart },
    runnersCount: { $lte: maxRunners, $gte: minRunners },
    purse: { $lte: maxPurse, $gte: minPurse },
    type: { $in: types as string[] },
  });

  if (queryRace.length === 0) return res.status(204).send();

  res.status(200).json(queryRace);
});
