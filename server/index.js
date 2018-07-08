#!/usr/bin/env node

'use strict';

// Import third-party dependencies
const Koa = require('koa');
const StaticServer = require('koa-static');

// Import local dependencies
const config = require('./config')();
const Logger = require('./logger/');
const DoomRouter = require('./doom/router');

// Constants
const API_URL_PREFIX = '/api';

// Declare instances
const app = new Koa();
const logger = Logger();
const doomRouter = DoomRouter(logger, API_URL_PREFIX);

// Middleware: request logging
app.use(async (ctx, next) => {
  logger.info('request', ctx.path, Date.now());
  await next();
});

// Serve the basic webpage assets
app.use(StaticServer('./assets/static'));

// Serve the client
app.use(StaticServer('../client/build'));

// Middleware: doom
app
  .use(doomRouter.routes())
  .use(doomRouter.allowedMethods());

// Middleware Error Handling
app.on('error', (err) => {
  logger.error('error', err.toString(), err, Date.now());
});

// Start Server
app.listen(config.httpServer, () => {
  const message = `server listening on port ${config.httpServer.port}`;

  console.log(message);
  logger.info('server.started', message, Date.now());
});
