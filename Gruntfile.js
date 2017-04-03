'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35735, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: [
          'public/css/*.css'
        ],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        options: { livereload: reloadPort }
      }
    }/*,
    uglify: {
             my_target: {
                     options: {mangle: false},
                            files: {
                            '../suratpoliceDistribution/public/minifiedjs/minjs-min.js':['public/js/lib/angular.min.js'],

                            '../suratpoliceDistribution/public/minifiedjs/jQuery-min.js':['public/js/lib/jquery-2.1.4.min.js'],

                                                           }
                          }
            },
    cssmin: {
              target: {
                        files: {
                          '../suratpoliceDistribution/public/minifiedcss/minCss-min.css': ['public/css/uiStyle.css']
                        }
                      }
            },
    processhtml: {
                 build: {
                        files: {
                           '../suratpoliceDistribution/public/index.html': ['public/index.html']
                         }
                       }
                 },
    copy: {
             main: {
                   files: [
                           {expand: true, cwd: 'app/', src: ['**'], dest: '../suratpoliceDistribution/app/'}
                          ]
                       }
          }*/
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);
  // load required npm plugins
     /* grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-processhtml');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-cssmin');*/

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);
  // grunt.registerTask('production',['cssmin','uglify','processhtml','copy']);
};
