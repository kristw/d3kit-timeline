module.exports = {
  build: {
    description: 'Bundle code for release',
    tasks: [
      // Clean output directory
      'clean:dist',
      'copy:dist',
      // - minify the packaged javascript
      'uglify:dist'
    ]
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