#!/usr/bin/env node

const webpack = require('webpack');

const config = require('../webpack.config')();

// @see - https://webpack.js.org/api/node/
webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err);

    if (err.details) {
      console.error(err.details);
    }

    process.exit(1);
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  process.stdout.write(stats.toString() + '\n');

  process.exit(0);
});