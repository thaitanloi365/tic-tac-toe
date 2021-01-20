module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          'root': './',
          'extensions': ['./.ios.js', '.android.js', '.js', '.json'],
          'alias': {
            '@Components': './Sources/Components',
            '@Utils': './Sources/Utils',
            '@Screens': './Sources/Screens',
            '@Themes': './Sources/Themes'
          }
        }
      ]
    ]
  };
};
