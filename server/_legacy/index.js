#!/usr/bin/env node

'use strict';

// Import third-party dependencies
const http = require('http');
const Koa = require('koa');
const StaticServer = require('koa-static');
const socketio = require('socket.io');

// Import local dependencies
const config = require('./config')();
const Logger = require('./logger/');
const DoomRouter = require('./doom/router');

// Constants
const API_URL_PREFIX = '/api';

// Declare instances
const logger = Logger();
const app = new Koa();
const server = http.createServer(app.callback());
const io = socketio(server);

const doomRouter = DoomRouter(logger, io, API_URL_PREFIX);

// Middleware: request logging
app.use(async (ctx, next) => {
  logger.info('request', ctx.path, Date.now());
  await next();
});

// Serve the basic webpage assets
app.use(StaticServer('./assets/static'));

// Serve the client
app.use(StaticServer('../client/dist'));

// Middleware: doom
app
.use(doomRouter.routes())
.use(doomRouter.allowedMethods());

// Middleware Error Handling
app.on('error', (err) => {
  logger.error('error', err.toString(), err, Date.now());
});

// On Socket Connection
io.on('connection', function(socket){
  logger.info('socket.io', 'a user connected', Date.now());

  socket.on('disconnect', function(){
    logger.info('socket.io', 'a user disconnected', Date.now());
  });
});

// Start Server
server.listen(config.httpServer.port, () => {
  const message = `server listening on port ${config.httpServer.port}`;

  logger.info('server.started', message, Date.now());
});
