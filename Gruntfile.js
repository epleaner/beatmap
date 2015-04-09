'use strict';
// var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
// var mountFolder = function(connect, dir) {
//     return connect.static(require('path').resolve(dir));
// };

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'handlebars'

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // show elapsed time at the end
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        // watch list
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,**/}*.{css,scss}',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,**/}*.js',
                    '{.tmp,<%= yeoman.app %>}/templates/{,**/}*.html',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',

                    'test/spec/{,**/}*.js'
                ],
                tasks: ['exec'],
                options: {
                    livereload: true
                }
            }
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

        // mocha command
        exec: {
            mocha: {
                command: 'mocha-phantomjs http://localhost:<%= connect.testserver.options.port %>/test',
                stdout: true
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
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
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
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: 'app/bower_components',
                relativeAssets: true
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


        // require
        // requirejs: {
        //     dist: {
        //         // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        //         options: {
        //             // `name` and `out` is set by grunt-usemin
        //             baseUrl: 'app/scripts',
        //             optimize: 'none',
        //             paths: {
        //                 'templates': '../../.tmp/scripts/templates'
        //             },
        //             // TODO: Figure out how to make sourcemaps work with grunt-usemin
        //             // https://github.com/yeoman/grunt-usemin/issues/30
        //             //generateSourceMaps: true,
        //             // required to support SourceMaps
        //             // http://requirejs.org/docs/errors.html#sourcemapcomments
        //             preserveLicenseComments: false,
        //             useStrict: true,
        //             wrap: true,
        //             //uglify2: {} // https://github.com/mishoo/UglifyJS2
        //             pragmasOnSave: {
        //                 //removes Handlebars.Parser code (used to compile template strings) set
        //                 //it to `false` if you need to parse template strings even after build
        //                 excludeHbsParser: true,
        //                 // kills the entire plugin set once it's built.
        //                 excludeHbs: true,
        //                 // removes i18n precompiler, handlebars and json2
        //                 excludeAfterBuild: true
        //             }
        //         }
        //     }
        // },

        requirejs: {
            dist: {
                //  All r.js options can be found here: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%= yeoman.app %>/scripts',
                    mainConfigFile: '<%= yeoman.app %>/scripts/common/requireConfig.js',
                    // paths: {
                    //     //  Paths fallbacks not supported in r.js so stub them with their fallbacks.
                    //     backbone: 'thirdParty/backbone',
                    //     'backbone.marionette': 'thirdParty/backbone.marionette',
                    //     bootstrap: 'thirdParty/bootstrap',
                    //     jquery: 'thirdParty/jquery',
                    //     'jquery.browser': 'thirdParty/jquery.browser',
                    //     'jquery.unveil': 'thirdParty/jquery.unveil',
                    //     lodash: 'thirdParty/lodash',
                    //     text: 'thirdParty/text'
                    // },
                    dir: '<%= yeoman.dist %>',
                    optimize: 'uglify',
                    //  Skip optimizing CSS here because it is handled when building LESS
                    optimizeCss: 'none',
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
                        insertRequire: ['main']
                    }],
                    //  Don't leave a copy of the file if it has been concatenated into a larger one.
                    removeCombined: true,
                    fileExclusionRegExp: /vsdoc.js$|.less$|.css$/,
                    preserveLicenseComments: false,
                    noBuildTxt: true,
                    wrap: true,
                    almond: true
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

        // useminPrepare: {
        //     html: '<%= yeoman.app %>/index.html',
        //     options: {
        //         dest: '<%= yeoman.dist %>'
        //     }
        // },

        // usemin: {
        //     html: ['<%= yeoman.dist %>/{,*/}*.html'],
        //     css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        //     options: {
        //         dirs: ['<%= yeoman.dist %>']
        //     }
        // },

        // imagemin: {
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: '<%= yeoman.app %>/images',
        //             src: '{,*/}*.{png,jpg,jpeg}',
        //             dest: '<%= yeoman.dist %>/images'
        //         }]
        //     }
        // },

        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= yeoman.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= yeoman.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },

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

        // htmlmin: {
        //     dist: {
        //         options: {
        //             removeCommentsFromCDATA: true,
        //             // https://github.com/yeoman/grunt-usemin/issues/44
        //             //collapseWhitespace: true,
        //             collapseBooleanAttributes: true,
        //             removeAttributeQuotes: true,
        //             removeRedundantAttributes: true,
        //             useShortDoctype: true,
        //             removeEmptyAttributes: true,
        //             removeOptionalTags: true
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: '<%= yeoman.app %>',
        //             src: '*.html',
        //             dest: '<%= yeoman.dist %>'
        //         }]
        //     }
        // },

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
                        // 'bower_components/requirejs/require.js'
                    ]
                }]
            }
        },

        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
    });

    // starts express server with live testing via testserver
    grunt.registerTask('default', function(target) {

        // what is this??
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.option('force', true);

        grunt.task.run([
            'clean:server',
            'compass:server',
            'connect:testserver',
            'express:dev',
            //  todo: mocha is broken right now, not sure why
            // 'exec',
            'open',
            'watch'
        ]);
    });

    // todo fix these <-- EP: this was generated by yo marionette...
    grunt.registerTask('test', [
        'clean:server',
        'compass',
        'connect:testserver',
        //  todo (EP): mocha is broken right now, not sure why
        // 'exec:mocha'
    ]);

    grunt.registerTask('build', [
        'requirejs',
        'compass:dist',
    //     'useminPrepare',
    //     'imagemin',
    //     'htmlmin',
    //     'concat',
    //     'cssmin',
    //     'uglify',
        'copy',
    //     'usemin'
    ]);

    // grunt.registerTask('build', [
        // 'handlebars',
        // 'requirejs', 
        // 'sass:dist', 
        // 'useminPrepare', 
        // 'concat:generated', 
        // 'usemin', 
        // 'htmlmin', 
        // 'imagemin', 
        // 'rename:main', 
        // 'replace:mainReferences', 
        // 'replace:localDebug', 
        // 'clean:dist'
    // ]);

    // simple build task

    // grunt.registerTask('build', [
    //   'requirejs',
    //   // 'useminPrepare',
    //   // 'concat:generated',
    //   // 'cssmin:generated',
    //   // 'uglify:generated',
    //   // 'usemin'
    // ]);

};
