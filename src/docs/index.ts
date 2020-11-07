import { OpenAPIV3 } from 'openapi-types';

import { allRacesTypes } from '../types';

const apiDoc: OpenAPIV3.Document = {
  openapi: '3.0.3',

  info: {
    title: 'Adada API',
    description: `Give API that scrap data for horse races.`,
    contact: {
      name: 'Cédric Pradels',
    },
    version: '0.0.1',
  },

  servers: [
    { url: 'localhost:4000', description: 'Development' },
    {
      url: 'https://adada-server.herokuapp.com',
      description: 'Production',
    },
  ],

  paths: {
    '/api/doc': {
      get: {
        tags: ['Documentation'],
        summary: 'API documentation',
        responses: {
          200: {
            description: 'Documentation interface of the API',
          },
        },
      },
    },

    '/api/races': {
      get: {
        tags: ['Races'],
        summary: 'Races list',
        parameters: [
          {
            name: 'date',
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
            name: 'types',
            description: 'Discipline of races',
            in: 'query',
            schema: {
              type: 'array',
              items: {
                type: 'string',
                enum: allRacesTypes,
              },
              example: ['flat', 'steeple-chase'],
            },
          },

          {
            name: 'minPurse',
            description: 'Minimum (include) races dotation.',
            in: 'query',
            schema: {
              type: 'integer',
              format: 'int32',
              example: 32000,
            },
          },

          {
            name: 'maxPurse',
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
                      url: {
                        type: 'string',
                        format: 'date',
                        example: '2020-10-28',
                      },

                      meetingNumber: {
                        type: 'number',
                        format: 'int32',
                        example: 1,
                      },

                      meetingName: {
                        type: 'string',
                        example: 'Vincennes',
                      },

                      raceNumber: {
                        type: 'number',
                        format: 'int32',
                        example: 4,
                      },

                      raceName: {
                        type: 'string',
                        example: 'Prix du bar du coin',
                      },

                      runnersCount: {
                        type: 'number',
                        format: 'int32',
                        example: 16,
                      },

                      purse: {
                        type: 'number',
                        format: 'int32',
                        example: 32000,
                      },

                      type: {
                        type: 'string',
                        enum: allRacesTypes,
                        example: 'flat',
                      },
                    },
                  },
                },
              },
            },
          },

          204: {
            description: 'No race found',
          },

          400: {
            description: 'Wrong parameter',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Wrong date parameter',
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
