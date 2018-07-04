'use strict';

const Router = require('koa-router');
const uuidv4 = require('uuid/v4');

const runGZDoom = require('./gzdoomWrapper');

module.exports = (logger) => {
  const router = new Router();

  router.get('/play', async (ctx, next) => {
    logger.info('gzdoom.play', 'About to play gzdoom', Date.now());

    const instanceId = uuidv4();

    // const preset = 'psxDoomBrutal';
    // const preset = 'brutalDoom';
    // const preset = 'brutalDoom64';
    const preset = 'mapsOfChaos';

    const gzdoomInstance = runGZDoom(preset, {
      onStdOut: (data) => {
        logger.info('gzdoom.stdout', data.toString(), Date.now());
      },
      onStdErr: (data) => {
        logger.warn('gzdoom.stderr', data.toString(), Date.now());
      },
      onClose: (code) => {
        if (code === 0) {
          logger.info('gzdoom.close', `gzdoom closed with code ${code}`, Date.now());
        }
        else {
          const message = `gzdoom closed with code ${code}`;

          logger.error('gzdoom.close', message, new Error(message), Date.now());
        }

        logger.info('gzdoom.terminated', instanceId, Date.now());
      },
    });

    await next();
  });

  return router;
};
