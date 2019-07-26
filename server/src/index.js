#!/usr/bin/env node

'use strict';

const express = require('express');

const _environmentConfig = require('./environment');
const _router = require('./router');

async function main () {
  const environmentConfig = _environmentConfig();
  const app = express();

  const {
    PORT,
  } = environmentConfig;

  _router(environmentConfig, app);

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });
}

main().catch((error) => {
  console.error(error);
  console.error('Failed to serve doom stuff!');
  process.exit(1);
});
