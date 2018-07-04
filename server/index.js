#!/usr/bin/env node

'use strict';

// Import third-party dependencies
const Koa = require('koa');
// const serveStatic = require('serve-static');

// Import local dependencies
const config = require('./config')();
const Logger = require('./logger/');
const DoomRouter = require('./doom/router');

// Declare instances
const app = new Koa();
const logger = Logger();
const doomRouter = DoomRouter(logger);

// Middleware: request logging
app.use(async (ctx, next) => {
  logger.info('request', ctx.path, Date.now());
  await next();
});

// app.use((req, res, next) => {
//   if (DEFAULT_STATIC_SERVER_FILES.includes(req.url)) {
//     return serveStatic(STATIC_SERVER_ASSETS_PATH)(req, res, next);
//   }

//   return serveStatic(STATIC_CLIENT_PATH)(req, res, next);
// });

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
