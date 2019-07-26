'use strict';

const { spawn } = require('child_process');
const assert = require('assert');
const moment = require('moment');
const uuidv4 = require('uuid/v4');

const DESTINATION = '/media/user/linux_storage/videos/obs_recordings';

module.exports = (logger) => {
  return class ScreenGrabber {
    static factory (path) {
      logger.info('ScreenGrabber.factory', `creating new ScreenGrabber, will be saved at ${path}`, Date.now());

      // @todo - ensure directory exists, and that I can write to it
      assert(path, 'You must tell me where to save the recording.');

      return new ScreenGrabber(path);
    }

    static fromPrefix (prefix) {
      const path = `${DESTINATION}/${prefix}_${moment(Date.now()).format('YYYY-MM-DD_HH:mm:ss:SSS')}.mkv`;

      logger.info('ScreenGrabber.fromPrefix', `creating new ScreenGrabber from prefix, will be saved at ${path}`, Date.now());

      return ScreenGrabber.factory(path);
    }

    constructor (path) {
      this.id = uuidv4();

      logger.info(`ScreenGrabber.constructor.${this.id}`, `creating new ScreenGrabber with id ${this.id}`, Date.now());

      this.path = path;
      this.recordingHasStarted = false;
      this.recordingHasConcluded = false;

      this.listeners = {
        stdout: [],
        stderr: [],
        close: [],
      };

      this.command = null;
      this.bin = null;
      this.parameters = null;
      this.pid = null;
      this.instance = null;
    }

    async start () {
      logger.info(`ScreenGrabber.start.${this.id}`, 'starting recording', Date.now());

      if (this.recordingHasStarted) {
        throw new Error('This ScreenGrabber has already started recording.  If you want to record again, use another ScreenGrabber.');
      }

      this.recordingHasStarted = true;

      this.bin = 'ffmpeg';
      // this.bin = '/media/user/linux_storage/projects/ffmpeg_stuff/ffmpeg';
      this.parameters = [
        '-y',
        '-loglevel', 'error',
        '-probesize', '25M',
        '-framerate', '60',
        '-video_size', '1920x1080',
        // Screen grab
        '-thread_queue_size', '1024',
        '-f', 'x11grab',
        '-i', `:0+1920,0`,
        // '-i', `1920,0`,
        // Audio grab for desktop
        '-thread_queue_size', '1024',
        '-f', 'pulse',
        '-i', 'alsa_output.usb-C-Media_Electronics_Inc._USB_PnP_Sound_Device-00.analog-stereo.monitor',
        // Audio grab for mic
        '-thread_queue_size', '1024',
        '-f', 'pulse',
        '-i', 'alsa_input.usb-C-Media_Electronics_Inc._USB_PnP_Sound_Device-00.analog-mono',
        // Create another audio track at the beginning that is both tracks mixed together
        '-filter_complex', 'amix=inputs=2[mic_and_desktop]',
        '-map', '0:v',
        '-map', '[mic_and_desktop]',
        '-map', '1:a',
        '-map', '2:a',
        // Encoding
        '-c:v', 'libx264', '-b:v', '25000k',
        // Ensure the capture is keeping up with the video!
        '-preset', 'ultrafast', '-crf', '0',
        this.path,
      ];

      this.command = `${this.bin} ${this.parameters.join(' ')}`;

      // @todo - how to get the pid?

      logger.info(`ScreenGrabber.start.${this.id}`, `issuing command ${this.command}`, Date.now());
      this.instance = spawn(this.bin, this.parameters);

      const stdoutListenerCount = this.listeners.stdout.length;
      for (let i = 0; i < stdoutListenerCount; i++) {
        this.instance.stdout.on('data', this.listeners.stdout[i]);
      }

      const stderrListenerCount = this.listeners.stderr.length;
      for (let i = 0; i < stderrListenerCount; i++) {
        this.instance.stderr.on('data', this.listeners.stderr[i]);
      }

      const closeListenerCount = this.listeners.close.length;
      for (let i = 0; i < closeListenerCount; i++) {
        this.instance.on('close', this.listeners.close[i]);
      }

      // give ffmpeg a few seconds to start up
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          logger.info(`ScreenGrabber.start.${this.id}`, 'start delay time elapsed', Date.now());

          resolve();
        }, 5000);
      });
    }

    async stop () {
      logger.info(`ScreenGrabber.stop.${this.id}`, 'stopping recording', Date.now());

      if (!this.recordingHasStarted) {
        throw new Error('Unable to stop this ScreenGrabber because it hasn\'t started recording yet.');
      }

      if (this.recordingHasConcluded) {
        throw new Error('Unable to stop this ScreenGrabber because it has already been stopped.');
      }

      this.recordingHasConcluded = true;

      // This is how you gracefully tell ffmpeg to stop
      this.instance.stdin.write('q');

      // give ffmpeg a few seconds to record the last few seconds
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          logger.info(`ScreenGrabber.stop.${this.id}`, 'stop delay time elapsed', Date.now());

          resolve();
        }, 5000);
      });
    }

    on (name, fn) {
      logger.info(`ScreenGrabber.on.${this.id}`, `registering listener for "${name}" event`, Date.now());

      assert(typeof fn === 'function', 'Cannot register a listener without a valid function.');

      switch (name) {
        case 'stdout':
        case 'stderr':
        case 'close': {
          this.listeners[name].push(fn);
          break;
        }
        default: {
          throw new Error(`Cannot register a listener for ${name} because that is not a valid ScreenGrabber event.`);
        }
      }
    }
  };
};
