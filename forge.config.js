const { cpSync } = require('fs');

module.exports = {
  packagerConfig: {
    asar: false,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'electron_quick_start',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {},
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  hooks: {
    packageAfterCopy: async (config, buildPath) => {
      console.log("idk", buildPath);
      return Promise.resolve();
      // cpSync('./packages/obscure-types', './node_modules/@obscure/types', { recursive: true });
    }
  },
  plugins: [],
  publishers: [],
};
