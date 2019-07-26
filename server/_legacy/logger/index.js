'use strict';

const logger = {
  info: (type, message, timeReceived = null) => {
    const timeLogged = Date.now();

    console.log('info', type, message, timeReceived, timeLogged);
  },
  warn: (type, message, timeReceived = null) => {
    const timeLogged = Date.now();

    console.log('warn', type, message, timeReceived, timeLogged);
  },
  error: (type, message, error, timeReceived = null) => {
    const timeLogged = Date.now();

    console.log('error', type, message, error, timeReceived, timeLogged);
  },
};

module.exports = () => logger;
