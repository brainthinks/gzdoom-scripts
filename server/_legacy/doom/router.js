'use strict';

const Router = require('koa-router');
const uuidv4 = require('uuid/v4');

const runGZDoom = require('./gzdoomWrapper');
const _ScreenGrabber = require('../ffmpeg/');

const config = require('./config');

const availablePresets = Object.keys(config.presets);

module.exports = (logger, io, routePrefix = '') => {
  const router = new Router();
  const ScreenGrabber = _ScreenGrabber(logger);

  router.get('presets', `${routePrefix}/presets`, async (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.type = 'json';
    ctx.response.body = availablePresets;

    await next();
  });

  router.get('play', `${routePrefix}/play/:preset`, async (ctx, next) => {
    logger.info('gzdoom.play', 'About to play gzdoom', Date.now());

    const instanceId = uuidv4();


    let preset = ctx.params.preset;

    if (!availablePresets.includes(preset)) {
      preset = 'purist';
    }

    // let screenGrabber = ScreenGrabber.fromPrefix('gzdoom');

    // screenGrabber.on('stdout', (data) => logger.info(`ffmpeg.stdout.${screenGrabber.id}`, data.toString(), Date.now()));
    // screenGrabber.on('stderr', (data) => logger.info(`ffmpeg.stderr.${screenGrabber.id}`, data.toString(), Date.now()));
    // screenGrabber.on('close', (code) => {
    //   if (code === 0) {
    //     logger.info(`ffmpeg.close.${screenGrabber.id}`, `closed with code ${code}`, Date.now());
    //   }
    //   else {
    //     const message = `closed with code ${code}`;

    //     logger.error(`ffmpeg.close.${screenGrabber.id}`, message, new Error(message), Date.now());
    //   }

    //   logger.info(`ffmpeg.terminated.${screenGrabber.id}`, instanceId, Date.now());

    //   screenGrabber = null;
    // });

    const gzdoomOptions = {
      onStdOut: (data) => {
        const message = data.toString();
        const date = Date.now();

        logger.info('gzdoom.stdout', message, date);
        io.emit('gzdoom.stdout', message, date);
      },
      onStdErr: (data) => {
        const message = data.toString();
        const date = Date.now();

        logger.warn('gzdoom.stderr', message, date);
        io.emit('gzdoom.stderr', message, date);
      },
      onClose: (code) => {
        const date = Date.now();

        if (code === 0) {
          const message = `gzdoom closed with code ${code}`;

          logger.info('gzdoom.close', message, date);
          io.emit('gzdoom.stdout', message, date);
        }
        else {
          const message = `gzdoom closed with code ${code}`;

          logger.error('gzdoom.close', message, new Error(message), date);
          io.emit('gzdoom.stderr', message, date);
        }

        logger.info('gzdoom.terminated', instanceId, date);
        io.emit('gzdoom.stdout', instanceId, date);

        // screenGrabbe.stop();
      },
    };

    const {
      // instance,
      command,
      // bin,
      options,
    } = runGZDoom(preset, gzdoomOptions);

    const message = `running command ${command}`;
    const date = Date.now();

    logger.info('gzdoom.play', message, date);
    io.emit('gzdoom.stdout', message, date);

    // gzdoom with project brutality is apparently resource intensive, so
    // wait a few seconds before starting to record so that gzdoom can be
    // done with its initial cpu spike, which causes the audio to go out
    // of sync in the ffmpeg recording
    setTimeout(() => {
      // screenGrabber.start();
    }, 10000);

    // @todo - is there a better way to indicate that this request was successful?
    ctx.response.status = 200;
    ctx.response.type = 'json';
    ctx.response.body = {
      preset,
      command,
      options,
    };

    await next();
  });

  return router;
};
