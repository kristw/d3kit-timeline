module.exports = {
  build: {
    description: 'Bundle code for release',
    tasks: [
      // Clean output directory
      'clean:dist',
      'copy:dist',
      // Minify the packaged javascript
      'uglify:dist',
      // Copy to examples
      'copy:examples',
    ]
  },

  'default': {
    description: 'Watch for changes and trigger builds.',
    tasks: ['build', 'connect:livereload', 'watch']
  }
};