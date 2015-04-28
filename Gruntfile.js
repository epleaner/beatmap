    'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: config,

        // watch list
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,**/}*.js',
                    '{.tmp,<%= yeoman.app %>}/templates/{,**/}*.html',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ],
                options: {
                    livereload: true
                }
            },

        },

        // testing server
        connect: {
            testserver: {
                options: {
                    port: 1234,
                    base: '.'
                }
            }
        },

        // express app
        express: {
            options: {
                // Override defaults here
                port: '9000'
            },
            dev: {
                options: {
                    script: 'server/app.js'
                }
            },
            prod: {
                options: {
                    script: 'server/app.js'
                }
            },
            test: {
                options: {
                    script: 'server/app.js'
                }
            }
        },


        // open app and test page
        open: {
            server: {
                path: 'http://localhost:<%= express.options.port %>'
            }
        },

        clean: {
            dist: ['<%= yeoman.dist %>/*'],
            server: '.tmp'
        },

        // linting
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                // 'test/spec/{,*/}*.js'
            ]
        },


        // compass
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                importPath: 'app/bower_components',
                force: true //  force compass to overwrite old files
            },
            dist: {
                options: {
                    sassDir: '<%= yeoman.app %>/styles',
                    cssDir: 'dist/styles',
                    specify: '<%= yeoman.app %>/styles/main.scss',
                    // imagesDir: '<%= yeoman.app %>/images',
                    // javascriptsDir: '<%= yeoman.app %>/scripts',
                    fontsDir: '<%= yeoman.app %>/styles/fonts',
                    importPath: 'app/bower_components',
                    relativeAssets: true,
                    outputStyle: 'compressed',
                    noLineComments: true,
                    // clean: true
                },
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        requirejs: {
            dist: {
                //  All r.js options can be found here: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%= yeoman.app %>/scripts',
                    mainConfigFile: '<%= yeoman.app %>/scripts/main.js',
                    dir: '<%= yeoman.dist %>/scripts',
                    optimize: 'uglify',
                    //  Inlines the text for any text! dependencies, to avoid the separate
                    //  async XMLHttpRequest calls to load those dependencies.
                    inlineText: true,
                    useStrict: true,
                    stubModules: ['text'],
                    findNestedDependencies: true,
                    //  List the modules that will be optimized. All their immediate and deep
                    //  dependencies will be included in the module's file when the build is done
                    modules: [{
                        name: 'main',
                        // insertRequire: ['main']
                    }],
                    //  Don't leave a copy of the file if it has been concatenated into a larger one.
                    removeCombined: true,
                    noBuildTxt: true,
                    preserveLicenseComments: false,
                    wrap: true,
                    //almond: true,

                    //Sets the logging level. It is a number. If you want "silent" running,
                    //set logLevel to 4. From the logger.js file:
                    //TRACE: 0,
                    //INFO: 1,
                    //WARN: 2,
                    //ERROR: 3,
                    //SILENT: 4
                    //Default is 0.
                    logLevel: 3,
                }
            }
        },

        sass: {                              
            dist: {                            
                options: {
                    style: 'compressed'
                },
                files: {                         
                    'main.css': 'main.scss',       // 'destination': 'source'
                }
            }
        },

        useminPrepare: {
            html: 'dist/index.html',
            options: {
                flow: {
                    html: {
                        steps: {
                            css: ['concat']
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            html: 'dist/index.html'
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                expand: true,
                cwd: 'dist',
                dest: 'dist/',
                src: ['**/*.html', '!**/template/**']
            }
        },

        //  Compress image sizes and move to dist folder
        imagemin: {
            files: {
                expand: true,
                cwd: 'dist/img',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/img'
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif,svg,png}',
                        '*.html',
                        'bower_components/requirejs/require.js',
                        'bower_components/modernizr/modernizr.js'
                    ]
                }]
            }
        },

        replace: {
          dist: {
            src: ['<%= yeoman.dist %>/index.html'],
            overwrite: true,                 // overwrite matched source files
            replacements: [{
              from: /^'<!-- replace:dist remove-start -->'.*'<!-- replace:dist remove-end -->'$/g,
              to: ''
            }]
          }
        },

        processhtml: {
            dist: {
                process: true,
              files: {
                '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
              }
            }
          },

        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
    });

    // starts express server with live testing via testserver
    grunt.registerTask('default', function() {
        grunt.option('force', true);

        grunt.task.run([
            'clean:server',
            'compass:server',
            'connect:testserver',
            'express:dev',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'requirejs',
        'compass:dist',
    //     'useminPrepare',
    //     'imagemin',
    //     'htmlmin',
    //     'concat',
    //     'cssmin',
    //     'uglify',
        'copy',
        'processhtml:dist'
    //     'usemin'
    ]);

};
