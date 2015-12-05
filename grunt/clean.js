// Empties folders to start fresh
module.exports = {
  dist: {
    files: [{
      dot: true,
      src: ['<%= yeoman.dist %>/*']
    }]
  }
};