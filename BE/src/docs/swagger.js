import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'Chao mung ban đến với trải nghiệm',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [
      './src/routes/auth.Routes.js',
      './src/routes/student.Routes.js',
      './src/routes/room.Routes.js',
      './src/routes/building.Routes.js',
      './src/routes/contract.Routes.js',
      './src/routes/payment.Routes.js',
      './src/routes/request.Routes.js',
      './src/routes/upload.Routes.js',
      './src/routes/user.Routes.js',
      './src/routes/report.Routes.js', // Include report routes
    ]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
