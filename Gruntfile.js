module.exports = function (grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' * Date <%= grunt.template.today("dd.mm.yyyy") %>\n' +
            ' */\n',
      bower_concat: {
         all: {
            dest: 'project/js/dev/bower.js',
            cssDest: 'project/css/dev/bower.css'
         }
      },
      less: {
         dev: {
            options: {},
            files: {
               "project/css/dev/style.css": "project/css/dev/*.less"
            }
         }
      },
      cssmin: {
         add_banner: {
            options: {
               banner: '<%= banner %>',
               keepSpecialComments: 0
            },
            files: {
               'project/css/style.min.css': [
                  'project/css/dev/normalize.css',
                  'project/css/dev/bower.css',
                  'project/css/dev/style.css'
               ]
            }
         }
      },
      uglify: {
         options: {
            banner: '<%= banner %>',
            mangle: {
               except: ['jQuery']
            }
         },
         my_target: {
            files: {
               'project/js/script.min.js': [
                  'project/js/dev/bower.js',
                  'project/js/dev/script.js'
               ]
            }
         }
      },
      jshint: {
         files: ['Gruntfile.js', 'project/js/dev/script.js'],
         options: {
            reporter: require('jshint-stylish'),
            globals: {
               jQuery: true,
               console: true,
               module: true,
               document: true
            }
         }
      },
      watch: {
         style: {
            files: ['project/css/dev/*'],
            tasks: ['style']
         },
         script: {
            files: ['project/js/dev/*'],
            tasks: ['script']
         }
      }

   });
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-bower-concat');
   grunt.loadNpmTasks('grunt-contrib-jshint');

   grunt.registerTask('default', ['bower_concat', 'less', 'cssmin', 'uglify', 'jshint']);
   grunt.registerTask('style', ['bower_concat', 'less', 'cssmin']);
   grunt.registerTask('script', ['bower_concat', 'uglify', 'jshint']);
};