module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-route/angular-route.js',
      'public/bower_components/angular-resource/angular-resource.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/angular-material/angular-material.js',
      "public/bower_components/angular-aria/angular-aria.js",
      "public/bower_components/angular-animate/angular-animate.js",
      'public/bower_components/angular-material-icons/angular-material-icons.min.js',
      'public/js/*.js',
      'public/js/**/*.js',
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