module.exports = function (grunt) {
	
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
      dev: '_dev',
		banner: '/*!\n' +
				' * <%= pkg.name %> v<%= pkg.version %>\n' +
				' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
				' * Licensed under <%= pkg.license %>\n' +
				' * Date <%= grunt.template.today("dd.mm.yyyy") %>\n' +
				' */\n',
		bower_concat: {
			all: {
				dest: '<%= dev %>/js/bower.js',
				cssDest: '<%= dev %>/css/bower.css'
			}
		},
		less: {
			dev: {
				options: {},
				files: {
					"<%= dev %>/css/style.css": "_dev/css/*.less"
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
					'css/style.min.css': ['<%= dev %>/css/*.css']
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
					'js/script.min.js': ['<%= dev %>/js/*.js']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', '<%= dev %>/js/script.js'],
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
						cwd: '<%= dev %>/img/',
						src: ['*.{png,jpg,gif}'],
						dest: 'img/'
					}]
			}
		},
		sprite: {
			all: {
				src: '<%= dev %>/img/icon/*.png',
				dest: 'img/spritesheet.png',
				destCss: '<%= dev %>/css/sprites.css'
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
					'<%= dev %>/css/*',
					'<%= dev %>/img/icon/*'
				],
				tasks: ['style']
			},
			script: {
				files: ['<%= dev %>/js/*'],
				tasks: ['script']
			},
			image: {
				files: ['<%= dev %>/img/*'],
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