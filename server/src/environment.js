'use strict';

module.exports = () => {
  const formatters = {
    _default: (value) => value,
    number: (value) => parseInt(value),
    commaSeparatedList: (value) => value.split(','),
  };

  function getEnvironmentVariable (defaultValue, name, type, formatter = (value) => value) {
    if (!process.env.hasOwnProperty(name)) {
      return formatter(defaultValue);
    }

    const value = formatter(process.env[name]);

    switch (type) {
      case Array: {
        if (Array.isArray(value)) {
          return value;
        }
        break;
      }
      default: {
        if (typeof value === type) {
          return value;
        }
      }
    }


    throw new Error(`Error while validating "${name}".  Value of "${value}" is not of type "${type}"`);
  }

  return {
    // The port that this app will be served over
    PORT: getEnvironmentVariable(3000, 'PORT', Number, formatters.number),
    // The prefix for all routes
    URL_PREFIX: getEnvironmentVariable('/api', 'URL_PREFIX', String),
    // A comma-separated list of directories that contain doom mods
    MOD_PATHS: getEnvironmentVariable('/media/user/linux_storage/games/doom/mods', 'MOD_PATHS', Array, formatters.commaSeparatedList),
    // A comma-separated list of gzdoom binaries/executables
    GZDOOM_BINS: getEnvironmentVariable('/media/user/linux_storage/games/doom/gzdoom/gzdoom_build/gzdoom/build/gzdoom', 'GZDOOM_BINS', Array, formatters.commaSeparatedList),
    // A comma-separated list of directories that contain stock gzdoom mod files.
    // Useful for those who build gzdoom
    GZDOOM_MOD_PATHS: getEnvironmentVariable('/media/user/linux_storage/games/doom/gzdoom/gzdoom_build/gzdoom/build', 'MOD_PATHS', Array, formatters.commaSeparatedList),
    // A comma-separated list of directories that contain doom wads
    WAD_PATHS: getEnvironmentVariable('/media/user/linux_storage/games/doom/WADs', 'WAD_PATHS', Array, formatters.commaSeparatedList),
    // A comma-separated list of directories that contain gzdoom configs.  Note that
    // not every mod/wad has the same configuration, and not every gameplay mode you
    // may want will have the same configuration, so each new combination of mods,
    // wads, etc. will result in a new configuration file.
    // @todo - give this "combination" a name, because that will determine this filename
    // and probably other stuff
    CONFIG_PATHS: getEnvironmentVariable('/media/user/linux_storage/games/doom/configs', 'CONFIG_PATHS', Array, formatters.commaSeparatedList),
  };
};
