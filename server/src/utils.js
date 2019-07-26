'use strict';

const fs = require('fs').promises;

module.exports = (environmentConfig) => {
  async function getDirectoryStructure(paths, extensions) {
    const directoryStructure = {};

    // go through all paths
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i].trim();

      directoryStructure[path] = {};

      const directoryContents = await fs.readdir(path, { withFileTypes: true });

      // go through the contents of the pah
      for (let i = 0; i < directoryContents.length; i++) {
        const dirent = directoryContents[i];
        const name = dirent.name;
        const fullPath = `${path}/${name}`;

        // handle directories
        if (dirent.isDirectory()) {
          const contents = (await getDirectoryStructure([fullPath], extensions))[fullPath];

          // skip directories that do not contain relevant files
          if (!Object.keys(contents).length) {
            continue;
          }

          directoryStructure[path][name] = {
            name,
            path,
            fullPath,
            isDirectory: true,
            contents,
          };
        }
        // handle files
        else {
          extensions.forEach((extension) => {
            if (fullPath.toLowerCase().endsWith(`.${extension}`)) {
              directoryStructure[path][name] = {
                name,
                path,
                fullPath,
                isDirectory: false,
              };
            }
          });
        }
      }
    }

    return directoryStructure;
  }

  return {
    getDirectoryStructure,
  };
};
