module.exports = function(grunt) {
  grunt.initConfig({
    bower: {
      install: {
        options: {
          targetDir: 'bower_components',
          copy: false
        }
      }
    },

    uglify: {
      main: {
        files: [
          {
            src: 'bower_components/FitText.js/jquery.fittext.js',
            dest: 'build/js/fittext.min.js'
          },
          {
            src: 'bower_components/modernizr/modernizr.js',
            dest: 'build/js/modernizr.min.js'
          }
        ]
      }
    },

    copy: {
      main: {
        files: [
          {
            src: 'bower_components/jquery/jquery.min.js',
            dest: 'build/js/jquery.min.js'
          },
          {
            src: 'bower_components/normalize-css/normalize.css',
            dest: 'sass/_normalize.scss'
          },
          {
            src: '*.html',
            dest: 'build/'
          },
          // {
          //   src: '*.php',
          //   dest: 'build/'
          // },
          {
            src: '*.asc',
            dest: 'build/'
          },
          {
            src: 'robots.txt',
            dest: 'build/',
          },
          {
            src: 'favicon.*',
            dest: 'build/'
          },
          {
            src: 'a.htaccess',
            dest: 'build/.htaccess'
          }
        ]
      }
    },

    sass: {
      main: {
        options: {
          style: "compressed"
        },
        files: {
          'build/css/main.css': 'sass/main.scss'
        }
      }
    },

    watch: {
      files: ['*.html', 'sass/*'],
      tasks: ['default']
    },

    rsync: {
      dist: {
        options: {
          args: ['-avz', '--delete'],
          src : 'build/',
          dest: '/sites/keith.so/public',
          host: 'ksmiley@66.175.208.254',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-rsync");

  grunt.registerTask('default', ['bower', 'copy', 'uglify', 'sass']);
  grunt.registerTask('deploy', ['default', 'rsync']);
};
