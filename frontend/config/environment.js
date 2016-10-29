/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'trainwhistle',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'landing.log-in',
    routeAfterAuthentication: 'product.dashboard',
    routeIfAlreadyAuthenticated: 'product.dashboard',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['ember-cli-post-build-copy'] = {
    "replace": true,
    "verbose": false,
    "development": [
      ['/assets/vendor.js','../web/static/vendor/vendor.js'],
      ['/assets/trainwhistle.js','../web/static/vendor/trainwhistle.js'],
      ['/assets/vendor.css','../web/static/css/vendor.css'],
      ['/assets/trainwhistle.css','../web/static/css/trainwhistle.css'],
      ['/images/city-poster.jpg', '../web/static/assets/images/city-poster.jpg'],
      ['/images/favicon.png', '../web/static/assets/images/favicon.png'],
      ['/images/logo-color.svg', '../web/static/assets/images/logo-color.svg'],
      ['/images/logo-icon-white.svg', '../web/static/assets/images/logo-icon-white.svg'],
      ['/images/logo.svg', '../web/static/assets/images/logo.svg'],
      ['/videos/city.mp4', '../web/static/assets/videos/city.mp4'],
    ]
  };

  return ENV;
};
