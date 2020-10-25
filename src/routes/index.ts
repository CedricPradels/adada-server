import { Router } from 'express';

import swaggerUIExpress from 'swagger-ui-express';
import apiDoc from '../docs';

export const router = Router();

router.use(swaggerUIExpress.serve);

router.get('/api-doc', swaggerUIExpress.setup(apiDoc));
