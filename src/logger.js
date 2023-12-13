const winston = require('winston');

// Configuração básica do logger
const logger = winston.createLogger({
  level: 'info', // ou 'debug' para mais informações
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(), // logs no console
    new winston.transports.File({ filename: 'app.log' }) // logs em um arquivo
  ],
});

module.exports = logger;
