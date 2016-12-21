// Karma configuration
// Generated on Wed Dec 14 2016 18:43:56 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'lib/angular/angular.js',
      'lib/angular-mocks/angular-mocks.js',
      'src/*.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome', 'IE', 'Firefox'],

    singleRun: true
  })
}
