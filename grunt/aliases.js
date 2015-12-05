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
  },

  'publish:patch': {
    description: 'Bundle code, bump version by 0.0.1 and publish to npm and bower',
    tasks: [
      'build',
      'bump:patch',
      'shell:publish'
    ]
  },
  'publish:minor': {
    description: 'Bundle code, bump version by 0.1 and publish to npm and bower',
    tasks: [
      'build',
      'bump:minor',
      'shell:publish'
    ]
  },
  'publish:major': {
    description: 'Bundle code, bump version by 1 and publish to npm and bower',
    tasks: [
      'build',
      'bump:major',
      'shell:publish'
    ]
  },
  'publish': ['publish:patch']
};