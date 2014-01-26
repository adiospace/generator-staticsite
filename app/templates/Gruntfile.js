'use strict';

module.exports = function(grunt) {

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
        tasks: ['assemble']
      },
      sass: {
        files: ['<%= config.src %>/assets/styles/{,*/}*.scss'],
        tasks: ['sass:dev']
      },
      coffee: {
        files: ['<%= config.src %>/assets/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dev']
      },
      js: {
        files: ['<%= config.src %>/assets/scripts/{,*/}*.js'],
        tasks: ['copy:js']
      },
      css: {
        files: ['<%= config.src %>/assets/styles/{,*/}*.css'],
        tasks: ['copy:css']
      },
      images: {
        files: ['<%= config.src %>/assets/images/{,*/}*.{png,jpeg,jpg,gif}'],
        tasks: ['copy:images']
      },
      fonts: {
        files: ['<%= config.src %>/assets/fonts/{,*/}*.{eot,woff,ttf,svg}'],
        tasks: ['copy:fonts']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/styles/{,*/}*.css',
          '<%= config.dist %>/assets/scripts/{,*/}*.js',
          '<%= config.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.dist %>/assets/fonts/{,*/}*.{eot,woff,ttf,svg}'
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
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          config: {
            src: '<%= config.src %>',
            dist: '<%= config.dist %>'
          },
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },


    sass: {
      dev: {
        options: {
          // node-neat includes both bourbon and neat
          includePaths: require('node-neat').includePaths
        },

        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/styles',
          src: '**/*.scss',
          dest: '<%= config.dist %>/assets/styles',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          // node-neat includes both bourbon and neat
          includePaths: require('node-neat').includePaths
        },

        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/styles',
          src: '**/*.scss',
          dest: '.tmp/assets/styles',
          ext: '.css'
        }]
      }
    },

    coffee: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/scripts',
          src: '**/*.coffee',
          dest: '<%= config.dist %>/assets/scripts',
          ext: '.js'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/scripts',
          src: '**/*.coffee',
          dest: '.tmp/assets/scripts',
          ext: '.js'
        }]
      }
    },

    copy: {
      // dev scripts
      js: {
        expand: true,
        cwd: '<%= config.src %>',
        src: ['**/*.js'],
        dest: '<%= config.dist %>/'
      },
      jsDist: {
        expand: true,
        cwd: '<%= config.src %>',
        src: ['**/*.js'],
        dest: '.tmp/'
      },
      css: {
        expand: true,
        cwd: '<%= config.src %>',
        src: ['**/*.css'],
        dest: '<%= config.dist %>/'
      },
      cssDist: {
        expand: true,
        cwd: '<%= config.src %>',
        src: ['**/*.css'],
        dest: '.tmp/'
      },
      images: {
        expand: true,
        cwd: '<%= config.src %>',
        src: ['**/*.{png,jpeg,jpg,gif}'],
        dest: '<%= config.dist %>/'
      },
      fonts: {
        expand: true,
        cwd: '<%= config.src %>',
        src: ['**/*.{eot,woff,ttf,svg}'],
        dest: '<%= config.dist %>/'
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
        options: {
          dest: '<%= config.dist %>',
          root: '.tmp'
        },
        html: '<%= config.dist %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
        options: {
            assetsDirs: ['<%= config.dist %>']
        },
        html: ['<%= config.dist %>/{,*/}*.html'],
        css: ['<%= config.dist %>/assets/styles/{,*/}*.css']
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
            '<%= config.dist %>/assets/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            '<%= config.dist %>/assets/fonts/{,*/}*.{eot,woff,ttf,svg}'
          ]
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },

        files: [{
          expand: true,
          cwd: '<%= config.dist %>/assets/images',
          src: ['**/*.{png,jpeg,jpg,gif}'],
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

    clean: {
      dist: ['<%= config.dist %>/', '.tmp/']
    }
  });

  //
  //TASKS
  //
  // TODO: take a look at grunt-contrib-htmlmin, svgmin
  //
  // General
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Dev
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Assemble (html, handblebars, markdown, partials, layouts, data and so on)
  grunt.loadNpmTasks('assemble');
  // Preprocs (sass with bourbon&neat and coffeescript)
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  // Linters
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Optmization
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-contrib-imagemin');



  grunt.registerTask('dev', [
    'clean',
    'assemble',
    'copy:js',
    'copy:css',
    'copy:images',
    'copy:fonts',
    'sass:dev',
    'coffee:dev'
  ]);

  grunt.registerTask('server', [
    'dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'copy:jsDist',
    'copy:cssDist',
    'copy:images',
    'copy:fonts',
    'sass:dist',
    'coffee:dist',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'rev',
    'usemin',
    'imagemin'
  ]);

  grunt.registerTask('default', ['server']);

};
