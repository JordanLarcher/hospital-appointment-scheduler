const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital Appointment api',
      version: '1.0.0',
      description: 'API for booking hospital Appointments'
    },
    server: [
      {
        url: 'htpp://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname), '../routes/*.js'];
};

module.exports = swaggerJsDoc(swaggerOptions);

