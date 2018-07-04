'use strict';

module.exports = () => {
  return {
    httpServer: {
      port: process.env.PORT || 3000,
    },
  }
}
