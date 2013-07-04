module.exports = function(grunt){
	grunt.initConfig({
		watch: {
			options: {
				livereload: true,
				nospawn: true
			},
			js: {
				files: ['js/**', '*.html'],
			}
		},
		connect: {
			server: {
				options: {
					port: 80
				}
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-connect')
	grunt.loadNpmTasks('grunt-contrib-watch')

	grunt.registerTask('default', ['connect', 'watch'])
}