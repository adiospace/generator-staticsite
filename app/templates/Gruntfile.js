'use strict';

// NOTE:
// # For performance reasons we're only matching one level down
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
//
// Use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

// NOTE:
// In dev, `dist`, `.tmp`, `src` dirs are used serve and watch files.
//

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // load the rest of non-grunt tasks
  grunt.loadNpmTasks('assemble');
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml,json}'],
        tasks: ['newer:assemble']
      },
      coffee: {
        files: ['<%= config.src %>/assets/scripts/{,*/}*.coffee'],
        tasks: ['newer:coffee']
      },
      js: {
        files: ['<%= config.src %>/assets/scripts/{,*/}*.js'],
        tasks: ['newer:jshint']
      },
      sass: {
        // newer doesn't work with include files
        // https://github.com/tschaub/grunt-newer/issues/29
        files: ['<%= config.src %>/assets/styles/{,*/}*.scss'],
        tasks: ['sass']
      },


      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          // reload when assemble generates html files
          '<%= config.dist %>/{,*/}*.html',
          // reload when sass generates css files
          '.tmp/assets/styles/{,*/}*.css',
          //reload when coffeescript generates js files
          '.tmp/assets/scripts/{,*/}*.js',
          // reload when plain css files changes
          '<%= config.src %>/assets/styles/{,*/}*.css',
          // reload when plain js files
          '<%= config.src %>/assets/scripts/{,*/}*.js',
          // reload when images changes
          '<%= config.src %>/assets/images/{,*/}*.{png,jpg,jpeg,gif}',
          // reload when fonts changes
          '<%= config.src %>/assets/fonts/{,*/}*.{eot,woff,ttf,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            // for css and js generated by SASS and CoffeeScript
            '.tmp',
            // other assets found directly in source
            '<%= config.src %>',
            // for html files generated by assemble
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        expand: true,
        assets: '<%= config.dist %>/assets',
        layout: '<%= config.src %>/templates/layouts/default.hbs',
        layoutDir: '<%= config.src %>/templates/layouts',
        data: '<%= config.src %>/data/*.{json,yml}',
        partials: '<%= config.src %>/templates/partials/*.hbs'
      },
      pages: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/templates/pages/',
          src: '**/*.hbs',
          dest: '<%= config.dist %>/',
          ext: '.html'
        }]
      }
    },

    sass: {
      dist: {
        options: {
          // node-neat package includes both bourbon and neat
          // we can use just node-bourbon if we don't want neat lib
          includePaths: require('node-neat').includePaths
        },

        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/styles',
          src: '{,*/}*.scss',
          dest: '.tmp/assets/styles',
          ext: '.css'
        }]
      }
    },

    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/assets/scripts',
          ext: '.js'
        }]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.dist %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>']
      },
      html: ['<%= config.dist %>/{,*/}*.html']
      // css: ['<%= config.dist %>/assets/styles/{,*/}*.css']
    },

    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/assets/scripts/{,*/}*.js',
            '<%= config.dist %>/assets/styles/{,*/}*.css',
            '<%= config.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif}',
            '<%= config.dist %>/assets/fonts/{,*/}*.{eot,woff,ttf,svg}'
          ]
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          cache: false
        },

        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= config.dist %>/assets/images'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.src %>/assets/scripts/{,*/}*.js'
      ]
    },

    copy: {
      // copy plain js and css files right next to
      // the other css and js files generated by SASS and CoffeeScript
      // in order to be optimized.
      plain: {
        expand: true,
        cwd: '<%= config.src %>/assets',
        src: [
          'scripts/{,*}/*.js',
          'styles/{,*}/*.css'
        ],
        dest: '.tmp/assets'
      },

      dist: {
        expand: true,
        cwd: '<%= config.src %>/assets',
        src: [
          // NOTE: images are copied by the imagemin task
          // TODO: add other assets here
          // Fonts
          'fonts/{,*}/*.{eot,woff,ttf,svg}'
        ],
        dest: '<%= config.dist %>/assets'
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    newer: {
      options: {
        cache: '.tmp'
      }
    },

    clean: {
      dist: ['<%= config.dist %>/', '.tmp/']
    }
  });


  grunt.registerTask('dev', [
    'jshint',
    'clean',
    'assemble',
    'sass',
    'coffee'
  ]);

  grunt.registerTask('server', [
    'dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'copy:plain',
    'copy:dist',
    'sass',
    'coffee',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'rev',
    'usemin',
    'imagemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', ['server']);
};
