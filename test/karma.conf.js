module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'app/public/bower_components/angular/angular.js',
      'app/public/bower_components/angular-route/angular-route.js',
      'app/public/bower_components/angular-resource/angular-resource.js',
      'app/public/bower_components/angular-mocks/angular-mocks.js',
      'app/public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/public/bower_components/angular-material/angular-material.js',
      "app/public/bower_components/angular-aria/angular-aria.js",
      "app/public/bower_components/angular-animate/angular-animate.js",
      'app/public/bower_components/angular-material-icons/angular-material-icons.min.js',
      'app/public/js/*.js',
      'app/public/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};