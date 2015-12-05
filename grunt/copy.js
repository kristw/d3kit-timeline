module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.src %>',
      dest: '<%= yeoman.dist %>',
      src: ['<%= yeoman.outputName %>.js']
    }]
  }
};