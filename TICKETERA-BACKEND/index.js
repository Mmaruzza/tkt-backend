const express = require('express');
const fs = require('fs');
const https = require('https');

// Crear el servidor de express
const app = express();
const cors = require('cors');
// CORS
app.use(cors())

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routers
app.use('/api/', require('./routes/auth'));
app.use('/api/entities/', require('./routes/entities'));

// Escuchar peticiones
if (process.env.SSL === 'ON') {
    const privateKey = fs.readFileSync(`sslcert/${process.env.SSL_KEY_CRT_NAME}.key`, 'utf8');
    const certificate = fs.readFileSync(`sslcert/${process.env.SSL_KEY_CRT_NAME}.crt`, 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(process.env.PORT, () => {
        console.log(`TICKETERA-BACKEND is working in port ${process.env.PORT}. SSL: ON`);
    });
} else {
    app.listen(process.env.PORT, () => {
        console.log(`TICKETERA-BACKEND is working in port ${process.env.PORT}. SSL: OFF`);
    });
}

