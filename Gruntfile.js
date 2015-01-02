module.exports = function (grunt) {
	
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

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
				dest: '_dev/js/bower.js',
				cssDest: '_dev/css/bower.css'
			}
		},
		less: {
			dev: {
				options: {},
				files: {
					"_dev/css/style.css": "_dev/css/*.less"
				}
			}
		},
		cssmin: {
			add_banner: {
				options: {
					banner: '<%= banner %>',
					keepSpecialComments: false
				},
				files: {
					'css/style.min.css': ['_dev/css/*.css']
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
					'js/script.min.js': ['_dev/js/*.js']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', '_dev/js/script.js'],
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
		imagemin: {
			all: {
				files: [{
						expand: true,
						cwd: '_dev/img/',
						src: ['*.{png,jpg,gif}'],
						dest: 'img/'
					}]
			}
		},
		sprite: {
			all: {
				src: '_dev/img/icon/*.png',
				dest: 'img/spritesheet.png',
				destCss: '_dev/css/sprites.css'
			}
		},
		/*
		php: {
        	watch: {}
    	},
    	*/
		watch: {
			style: {
				files: [
					'_dev/css/*',
					'_dev/img/icon/*'
				],
				tasks: ['style']
			},
			script: {
				files: ['_dev/js/*'],
				tasks: ['script']
			},
			image: {
				files: ['_dev/img/*'],
				tasks: ['imagemin']
			}
		}

	});

	grunt.registerTask('default', [
		'bower_concat',
		'less',
		'sprite',
		'cssmin',
		'uglify',
		'imagemin',
		'jshint'
	]);
	grunt.registerTask('style', [
		'less',
		'sprite',
		'cssmin'
	]);
	grunt.registerTask('script', [
		'uglify',
		'jshint'
	]);
	grunt.registerTask('image', [
		'style',
		'imagemin'
	]);

	//grunt.registerTask('serv', ['php:watch', 'watch']);
};