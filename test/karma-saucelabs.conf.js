const {customLaunchers, platformMap} = require('./browser-providers');

module.exports = karmaConfig => {
  const config = {
    plugins: [
      require('angular_material/tools/saucelabs-bazel/launcher'),
    ],
    customLaunchers: customLaunchers,
    browserNoActivityTimeout: 90000,
    browserDisconnectTimeout: 90000,
    browserDisconnectTolerance: 2,
    captureTimeout: 90000,
    browsers: platformMap.saucelabs,
    transports: ['polling', 'websocket'],
  };

  karmaConfig.set(config);
};
