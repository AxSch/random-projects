module.exports = function(grunt) {
  // HTML Lint Config.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: ['css/bootstrap.min.css', 'css/font-awesome.min.css', 'css/style.min.css'],
        dest: 'css/ay.min.css',
      },
    },
    cssmin: {
      options: {
        keepSpecialComments: '*',
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['blogstyle.css'],
          dest: 'css/',
          ext: '.min.css'
        }]
      }
    },
    htmllint: {
      //all: ["*.html"]
	  all: {
  options: {
    ignore: ['Consider using the “h1” element as a top-level heading only (all “h1” elements are treated as top-level headings by many screen readers and other tools).']
  },
  src: "*.html"
}
    },
    csscomb: {
      options: {
        config: 'css/.csscomb.json'
      },
      skinS: {
        expand: true,
        cwd: 'css/',
        src: ['blogstyle.css'],
        dest: 'css/'
      }
    },
    bootlint: {
      options: {
        relaxerror: [],
        showallerrors: true,
        stoponerror: false,
        stoponwarning: false
      },
      files: ['*.html']
    },
    postcss: {
      options: {
      map: {
          inline: false, 
          annotation: 'css/'
      },
        processors: [
		  require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: ['last 2 version']}),
          require('cssnext')(),
          require('precss')()
        ]
      },
      dist: {
        src: 'css/blogstyle.css',
      }
},
    csslint: {
      options: {
        csslintrc: 'css/.csslintrc',
        absoluteFilePathsForFormatters: true,
        formatters: [{
          id: 'junit-xml',
          dest: 'csslint_junit.xml'
        }, {
          id: 'csslint-xml',
          dest: 'csslint.xml'
        }]
      },
      strict: {
        options: {
          import: 2
        },
        src: ['css/blogstyle.css']
      }
    },
    connect: {
      server: {
        options: {
          port: 80,
          base: '.'
        }
      }
    },
    "jsbeautifier": {
      files: ["*.html", "css/blogstyle.css"],
      options: {
        html: {
          braceStyle: "collapse",
          indentChar: " ",
          indentScripts: "keep",
          indentSize: 2,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          unformatted: ["sub", "sup", "b", "i", "u"],
          wrapLineLength: 0
        },
        css: {
          indentChar: " ",
          indentSize: 2
        },
        js: {
          braceStyle: "collapse",
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: true,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0,
          endWithNewline: true
        }
      }
    },
    imagemin: {
      dynamic: {
        options: { // Target options 
          optimizationLevel: 7,
          svgoPlugins: [{
            removeViewBox: false
          }]
        },
        files: [{
          expand: true, // Enable dynamic expansion 
          cwd: 'img/', // Src matches are relative to this path 
          src: ['**/*.{png,jpg,gif}'], // Actual patterns to match 
          dest: 'img/' // Destination path prefix 
        }]
      }
    },
    watch: {
      scripts: {
        files: ['*.html', 'css/blogstyle.css'],
        //tasks: ['postcss','jsbeautifier', 'csscomb', 'csslint', 'cssmin', 'concat', 'htmllint', 'bootlint'], // just code standards
        tasks: ['postcss','jsbeautifier', 'csscomb', 'csslint', 'cssmin', 'htmllint', 'bootlint'], // just code standards
        options: {
          reload: true,
          dateFormat: function(time) {
            grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
            grunt.log.writeln('Waiting for more changes...');
          },
        },
      },
    }
  });
  // Load the plugin that provides the "uglify" task.
   grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Default task(s).
  grunt.registerTask('default', ['watch']);
};