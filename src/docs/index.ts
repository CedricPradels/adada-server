import { OpenAPIV3 } from 'openapi-types';

const apiDoc: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'Adada API',
    description: 'Give API that scrap data for horse races.',
    contact: {
      name: 'Cédric Pradels',
    },
    version: '0.0.1',
  },
  servers: [
    { url: 'localhost:4000', description: 'Development server.' },
    {
      url: 'https://adada-server.herokuapp.com',
      description: 'Production server.',
    },
  ],
  paths: {
    '/api-doc': {
      get: {
        responses: {
          200: {
            description: 'Documentation interface of the API',
          },
        },
      },
    },
  },
};

export default apiDoc;
