const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const https = require('https');
// Crear el servidor de express
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// CORS
app.use(cors())

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json({ limit: '100mb' }));

// Routers
// authentication
app.use('/api/auth', require('./routes/auth'));
app.use('/api/entities/', require('./routes/entities'));

if (process.env.SHOW_DOCUMENTATION === 'ON') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

if (process.env.SSL === 'ON') {
    const privateKey = fs.readFileSync(`sslcert/${process.env.SSL_KEY_CRT_NAME}.key`, 'utf8');
    const certificate = fs.readFileSync(`sslcert/${process.env.SSL_KEY_CRT_NAME}.crt`, 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(process.env.PORT, () => {
        console.log(`API-GATEWAY is working in port ${process.env.PORT}. SSL: ON`);
    });
} else {
    app.listen(process.env.PORT, () => {
        console.log(`API-GATEWAY is working in port ${process.env.PORT}. SSL: OFF`);
    });
}
