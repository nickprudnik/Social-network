require('dotenv').config();

const server = require('./app');
const config = require('./lib/config');

server(() => console.log(`Server has been started ${config.port}`));
