'use strict';

const _utils = require('./utils');

// @todo - HATEOS
// @todo - graphql
module.exports = (environmentConfig, app) => {
  const {
    URL_PREFIX,
    MOD_PATHS,
    GZDOOM_BINS,
    GZDOOM_MOD_PATHS,
    WAD_PATHS,
    CONFIG_PATHS,
  } = environmentConfig;

  const {
    getDirectoryStructure,
  } = _utils(environmentConfig);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get(`${URL_PREFIX}/wads`, async (req, res, next) => {
    const wadFiles = await getDirectoryStructure(WAD_PATHS, ['wad']);

    res.send(wadFiles);
  });

  app.get(`${URL_PREFIX}/gzdoom_mods`, async (req, res, next) => {
    const modFiles = await getDirectoryStructure(GZDOOM_MOD_PATHS, ['pk3', 'sf2']);

    res.send(modFiles);
  });

  app.get(`${URL_PREFIX}/mods`, async (req, res, next) => {
    const modFiles = await getDirectoryStructure(MOD_PATHS, ['pk3', 'sf2', 'wad', 'txt']);

    res.send(modFiles);
  });

  app.get(`${URL_PREFIX}/configs`, async (req, res, next) => {
    const configFiles = await getDirectoryStructure(CONFIG_PATHS, ['ini']);

    res.send(configFiles);
  });
};
