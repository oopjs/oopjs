module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'dist/oopjs/oop.js': [
            'src/oopjs/oop.js'
          ]
        },
        options: {
          banner: '/*! oop.js - http://oopjs.com/ - Written by Andrew Ewing - http://github.com/aewing - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          beautify: false,
          mangle: true
        }
      },
      example: {
        files: {
          'example/js/app.js': [
            'src/oopjs/oop.js',
            'example/app/plugins/*.js',
            'example/app/controllers/*.js',
            'example/app/main.js'
          ]
        },
        options: {
          banner: '/*! oop.js/example - http://oopjs.com/ - Written by Andrew Ewing - http://github.com/aewing - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          beautify: false,
          mangle: true
        }
      }
    },
    jshint: {
      uses_defaults: ['src/oopjs/*.js'],
      with_overrides: {
        options: {
          "curly": true,
          "eqnull": true,
          "eqeqeq": true,
          "undef": true,
          "globals": {
            "OOP": true,
            "window": true,
            "XMLHttpRequest": true,
            "console": true,
            "global": true
          }
        },
        files: {
          src: ['src/oopjs/*.js']
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://oopjs.dev/tests/tests.html']
        }
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'src/oopjs/',
          outdir: 'docs/',
          themedir: 'node_modules/yuidoc-bootstrap-theme',
          helpers: ['node_modules/yuidoc-bootstrap-theme/helpers/helpers.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  grunt.registerTask('build', ['jshint', 'uglify', 'yuidoc']);
  grunt.registerTask('test', ['jshint', 'uglify', 'qunit']);

};