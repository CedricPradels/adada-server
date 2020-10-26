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
    '/api/doc': {
      get: {
        responses: {
          200: {
            description: 'Documentation interface of the API',
          },
        },
      },
    },

    '/api/races': {
      get: {
        parameters: [
          {
            name: 'Date',
            description: 'Date of the day',
            in: 'query',
            schema: {
              type: 'string',
              format: 'date',
              example: '2020-12-31',
            },
          },

          {
            name: 'maxRunners',
            description: 'Maximum (include) runners in races.',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
              example: 12,
            },
          },

          {
            name: 'minRunners',
            description: 'Minimum (include) runners in races.',
            in: 'query',
            allowEmptyValue: true,
            schema: {
              type: 'integer',
              format: 'int32',
              example: 8,
            },
          },

          {
            name: 'Discipline',
            description: 'Discipline of races',
            in: 'query',
            schema: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['attele', 'plat', 'monte', 'obstacle'],
              },
              example: ['attele', 'plat'],
            },
          },

          {
            name: 'minDotation',
            description: 'Minimum (include) races dotation.',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
              example: 32000,
            },
          },

          {
            name: 'maxDotation',
            description: 'Maximum (include) races dotation.',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
              example: 132000,
            },
          },
        ],

        responses: {
          200: {
            description: 'Documentation interface of the API',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      meetingNumber: {
                        type: 'number',
                        format: 'int32',
                      },
                      meetingName: {
                        type: 'number',
                        format: 'int32',
                      },
                      raceNumber: {
                        type: 'number',
                        format: 'int32',
                      },
                      raceName: {
                        type: 'number',
                        format: 'int32',
                      },
                      runners: {
                        type: 'object',
                        properties: {
                          count: {
                            type: 'number',
                            format: 'int32',
                          },
                        },
                      },
                      dotaton: {
                        type: 'number',
                        format: 'int32',
                      },
                      discipline: {
                        type: 'string',
                        enum: ['attele', 'plat', 'monte', 'obstacle'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default apiDoc;
