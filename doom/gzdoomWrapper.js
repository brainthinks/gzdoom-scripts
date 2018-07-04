'use strict';

const { spawn } = require('child_process');
const assert = require('assert');

const config = require('./config');

function buildOptions (config) {
  const spawnOptions = [];
  const optionsInOrder = [
    'config',
    'savedir',
    'exec',
    'iwad',
    'file',
  ];
  const optionsCount = optionsInOrder.length;

  for (let i = 0; i < optionsCount; i++) {
    const name = optionsInOrder[i];
    const exists = config.hasOwnProperty(name);
    const value = config[name];

    if (!exists) {
      continue;
    }

    // option flag, e.g. `-file`
    spawnOptions.push(`-${name}`);
    // option content, e.g. `/path/to/wad/file`
    Array.isArray(value)
      ? spawnOptions.push(...value)
      : spawnOptions.push(value);
  }

  return spawnOptions;
}

function runGZDoom (presetName, {
  onStdOut = (data) => console.log(`stdout: ${data}`),
  onStdErr = (data) => console.log(`stderr: ${data}`),
  onClose = (code) => console.log(`child process exited with code ${code}`),
}) {
  assert(
    config.presets.hasOwnProperty(presetName),
    `Preset "${presetName}" not found.`
  );

  const builtOptions = buildOptions(config.presets[presetName]);
  const instance = spawn(config.bins.gzdoom, builtOptions);

  instance.stdout.on('data', onStdOut);
  instance.stderr.on('data', onStdErr);
  instance.on('close', onClose);

  return {
    instance,
    command: `${config.bins.gzdoom} ${builtOptions.join(' ')}`,
    bin: config.bins.gzdoom,
    options: builtOptions,
  };
}

module.exports = runGZDoom;
