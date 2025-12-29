import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'APE Padel League API',
      version: '1.0.0',
      description: 'API documentation for APE Padel League',
      contact: {
        name: 'APE Padel League',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Team: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Team ID',
            },
            name: {
              type: 'string',
              description: 'Team name',
            },
          },
        },
        Season: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Season ID',
            },
            name: {
              type: 'string',
              description: 'Season name',
            },
            startDate: {
              type: 'string',
              format: 'date',
            },
            endDate: {
              type: 'string',
              format: 'date',
            },
            isActive: {
              type: 'boolean',
            },
          },
        },
        Match: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Match ID',
            },
            seasonId: {
              type: 'string',
              description: 'Season ID',
            },
            team1Id: {
              type: 'string',
              description: 'Team 1 ID',
            },
            team2Id: {
              type: 'string',
              description: 'Team 2 ID',
            },
            date: {
              type: 'string',
              format: 'date-time',
            },
            status: {
              type: 'string',
              enum: ['scheduled', 'live', 'finished'],
            },
          },
        },
      },
    },
  },
  apis: ['./api/routes.js', './api/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
