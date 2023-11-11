module.exports = {
  appId: 'obscurely.ObscureWarcraftCombatParser',
  asar: true,
  directories: {
    output: 'releases/${version}',
  },
  files: [
    'packages/obscure-electron/dist',
    'packages/obscure-ui/dist',
    {
      from: 'packages/obscure-types',
      to: 'node_modules/@obscure/types',
    },
  ],

  extraResources: ['database.db'],
  win: {
    target: {
      target: 'nsis',
      arch: 'x64',
    },
    artifactName: '${productName}_${version}.${ext}',
  },
};
