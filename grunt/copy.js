module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.src %>',
      dest: '<%= yeoman.dist %>',
      src: ['<%= yeoman.outputName %>.js']
    }]
  },
  examples: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.dist %>',
      dest: '<%= yeoman.examples %>/dist',
      src: ['*.js']
    }]
  }
};