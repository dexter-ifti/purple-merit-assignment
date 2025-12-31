const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'User Authentication and Management System API',
        description: 'API documentation for User Authentication and Management System',
    },
    
    host: 'purple-merit-assignment-zcie.onrender.com',
    // host: 'localhost:5000',
    basePath: '/api',
};

const outputFile = './swagger-output.json';
const routes = ['./routes/auth.js', './routes/users.js'];


swaggerAutogen(outputFile, routes, doc);