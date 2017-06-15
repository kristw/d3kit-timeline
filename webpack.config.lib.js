const path = require('path');
const merge = require('webpack-merge');

const commonConfig = {
  entry: [
    './src/main.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'd3kit-timeline.min.js',
    sourceMapFilename: '[file].map',
    library: 'd3KitTimeline',
    libraryTarget: 'umd',
    umdNamedDefine: false
  },
  externals: {
    'labella': {
      root: 'labella',
      commonjs2: 'labella',
      commonjs: 'labella',
      amd: 'labella'
    },
    'd3-array': {
      root: 'd3',
      commonjs2: 'd3-array',
      commonjs: 'd3-array',
      amd: 'd3-array'
    },
    'd3-axis': {
      root: 'd3',
      commonjs2: 'd3-axis',
      commonjs: 'd3-axis',
      amd: 'd3-axis'
    },
    'd3-scale': {
      root: 'd3',
      commonjs2: 'd3-scale',
      commonjs: 'd3-scale',
      amd: 'd3-scale'
    },
    'd3-selection': {
      root: 'd3',
      commonjs2: 'd3-selection',
      commonjs: 'd3-selection',
      amd: 'd3-selection'
    },
    'd3-transition': {
      root: 'd3',
      commonjs2: 'd3-transition',
      commonjs: 'd3-transition',
      amd: 'd3-transition'
    },
    'd3-dispatch': {
      root: 'd3',
      commonjs2: 'd3-dispatch',
      commonjs: 'd3-dispatch',
      amd: 'd3-dispatch'
    },
    'd3kit': {
      root: 'd3Kit',
      commonjs2: 'd3kit',
      commonjs: 'd3kit',
      amd: 'd3kit'
    }
  }
};

let config;
const prodConfig = require('lazynerd-devtools/config/webpack/webpack.config.prod.js');
config = merge(prodConfig, commonConfig);
config.plugins = [];

module.exports = config;

