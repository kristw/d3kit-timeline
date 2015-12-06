# d3Kit-timeline

If you want to have a simple timeline that labels do not overlap, but too lazy to implement one from scratch, this library is for you. Below is a screenshot of four timelines of the same data, each can be created via ~10 lines of code. [See demo.](http://kristw.github.io/d3kit-timeline)

This small library is built on top of [D3](http://d3js.org/), [d3Kit](https://github.com/twitter/d3kit) and [Labella.js](https://github.com/twitter/labella.js).

<p align="center">
  <a href="http://kristw.github.io/d3kit-timeline/" style="width:100%;">
    <img src="examples/images/thumbnail.png">
  </a>
</p>

### Install

```
npm install d3kit-timeline --save
```

or

```
bower install d3kit-timeline --save
```

### Example Usage

If you have this dataset

```
var data = [
  {time: new Date(1977, 4,25), episode: 4, name: 'A New Hope'},
  {time: new Date(1980, 4,17), episode: 5, name: 'The Empire Strikes Back'},
  {time: new Date(1984, 4,25), episode: 6, name: 'Return of the Jedi'},
  {time: new Date(1999, 4,19), episode: 1, name: 'The Phantom Menace'},
  {time: new Date(2002, 4,16), episode: 2, name: 'Attack of the Clones'},
  {time: new Date(2005, 4,19), episode: 3, name: 'Revenge of the Sith'},
  {time: new Date(2015,11,18), episode: 7, name: 'The Force Awakens'},
];
```

Here is how to create a timeline with labels on the right.

```
var chart = new d3Kit.timeline('#timeline', {
  direction: 'right',
  initialWidth: 400,
  initialHeight: 250,
  textFn: function(d){
    return d.time.getFullYear() + ' - ' + d.name;
  }
});

chart.data(data);
```

For more detailed usage please refer to the API Reference.

### Import to your project

##### Choice 1. Global

Adding this library via ```<script>``` tag is the simplest way. By doing this, ```d3Kit.timeline``` is available in the global scope.

```
<script src="bower_components/d3/d3.min.js"></script>
<script src="bower_components/d3kit/dist/d3kit.min.js"></script>
<script src="bower_components/labella/dist/labella.min.js"></script>
<script src="bower_components/d3kit-timeline/dist/d3kit-timeline.min.js"></script>
```

##### Choice 2: AMD

If you use requirejs, this library support AMD out of the box.

```
require.config({
  paths: {
    d3:    'path/to/d3',
    d3kit: 'path/to/d3Kit',
    labella: 'path/to/labella',
    'd3kit-timeline': 'path/to/d3kit-timeline'
  }
});
require(['d3kit-timeline'], function(d3KitTimeline) {
  // do something
});
```

Note: If you use this method, this library will not be attached to the d3Kit object and cannot be referenced by d3Kit.timeline.

##### Choice 3: node.js / browserify

d3kit-timeline also supports usage in commonjs style.

```
var d3KitTimeline = require('path/to/d3kit-timeline');
```

Note: If you use this method, this library will not be attached to the d3Kit object and cannot be referenced by d3Kit.timeline.

### Author

Krist Wongsuphasawat / [@kristw](https://twitter.com/kristw)

Copyright 2015. Licensed under the [Apache License Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
