'use strict';

const Router = require('koa-router');
const uuidv4 = require('uuid/v4');

const runGZDoom = require('./gzdoomWrapper');
const _ScreenGrabber = require('../ffmpeg/');

module.exports = (logger, routePrefix = '') => {
  const router = new Router();
  const ScreenGrabber = _ScreenGrabber(logger);

  router.post(`${routePrefix}/play`, async (ctx, next) => {
    logger.info('gzdoom.play', 'About to play gzdoom', Date.now());

    const instanceId = uuidv4();

    // const preset = 'armyOfDarkness';
    // const preset = 'brutalDoom64';
    // const preset = 'purist';
    // const preset = 'vanilla';
    // const preset = 'brutalDoom';
    // const preset = 'psxDoomBrutal';
    const preset = 'mapsOfChaos';

    let screenGrabber = ScreenGrabber.fromPrefix('gzdoom');

    screenGrabber.on('stdout', (data) => logger.info(`ffmpeg.stdout.${screenGrabber.id}`, data.toString(), Date.now()));
    screenGrabber.on('stderr', (data) => logger.info(`ffmpeg.stderr.${screenGrabber.id}`, data.toString(), Date.now()));
    screenGrabber.on('close', (code) => {
      if (code === 0) {
        logger.info(`ffmpeg.close.${screenGrabber.id}`, `closed with code ${code}`, Date.now());
      }
      else {
        const message = `closed with code ${code}`;

        logger.error(`ffmpeg.close.${screenGrabber.id}`, message, new Error(message), Date.now());
      }

      logger.info(`ffmpeg.terminated.${screenGrabber.id}`, instanceId, Date.now());

      screenGrabber = null;
    });

    const {
      // instance,
      command,
      // bin,
      // options,
    } = runGZDoom(preset, {
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

        screenGrabber.stop();
      },
    });

    logger.info('gzdoom.play', `running command ${command}`, Date.now());

    // gzdoom with project brutality is apparently resource intensive, so
    // wait a few seconds before starting to record so that gzdoom can be
    // done with its initial cpu spike, which causes the audio to go out
    // of sync in the ffmpeg recording
    setTimeout(() => {
      screenGrabber.start();
    }, 10000);

    await next();
  });

  return router;
};
