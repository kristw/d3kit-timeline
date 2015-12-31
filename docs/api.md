[Introduction](https://github.com/kristw/d3kit-timeline) |
[Demo](http://kristw.github.io/d3kit-timeline) |
**API Reference**

## d3Kit.Timeline

<a name="constructor" href="#constructor">#</a> var chart = new **d3Kit.Timeline**([options:Object]);

There are many options that you can customize. These are often set when creating the chart but also can be changed later via ```chart.options(options)```

| option  | default | description |
| ------- | ------- | ----------- |
| margin  | {left: 40, right: 20, top: 20, bottom: 20} | margin for the chart area (more like a padding) |
| initialWidth | 400 | chart width including margin |
| initialHeight | 400 | chart height including margin |
| scale | d3.time.scale() | Can specify other type of scale e.g. ```d3.scale.linear``` | 
| domain | undefined | If set, will set domain of the scale to this value. Otherwise, the domain will be calculated from the extent of data. |
| direction | 'right' | location of the labels relative to the axis |
| keyFn | undefined | identifier function for each data point. ```function(d,i){return ...;}```| 
| timeFn | return ```d.time```; | accessor function for time of each data point. ```function(d,i){return ...;}```|
| textFn | return ```d.text```; | accessor function for text of each data point. ```function(d,i){return ...;}```|
| labella | ```{}``` | options for Labella.js layout. See [Labella.js](https://github.com/twitter/labella.js/blob/master/docs/Force.md#constructor) documentation for more details. For example, to set maxixum position for the labels to 500, set this option to ```{maxPos: 500}``` | 
| layerGap | 60 | distance from axis to the first layer of labels and between each layer of labels (in situations where all labels cannot fit within one layer) | 
| dotRadius | 3 | radius of the dots. It can be a Number or Function ```function(d,i){return ...;}``` |
| dotColor | #222 | color of the dots. It can be a color value or Function ```function(d,i){return ...;}``` |
| labelBgColor | #222 | color of the label background. It can be a color value or Function ```function(d,i){return ...;}``` |
| labelTextColor | #fff | color of the label text. It can be a color value or Function ```function(d,i){return ...;}``` |
| linkColor | #222 | color of the paths that link dots to labels. It can be a color value or Function ```function(d,i){return ...;}``` |
| labelPadding | {left: 4, right: 4, top: 3, bottom: 2} | space to add around the text within each label |
| textYOffset | 0.85em | vertical offset for text within label |

### Fields

<a name="axis" href="#axis">#</a> chart.**axis**

An axis renderer for the timeline. See [d3.svg.axis](https://github.com/mbostock/d3/wiki/SVG-Axes) for full API reference. One common use case is to hide all the ticks.

```javascript
chart.axis.ticks(0).tickSize(0);
```

### Functions

<a name="data" href="#data">#</a> chart.**data**([data:Array])

Get/Set data for this chart, inherited from [skeleton.data()](https://github.com/twitter/d3kit/wiki/Skeleton#data) in d3Kit.

<a name="options" href="#options">#</a> chart.**options**([options:Object])

Get/Set options for this chart, inherited from [skeleton.options()](https://github.com/twitter/d3kit/wiki/Skeleton#options) in d3Kit. See the list of options from the top of this page.

<a name="on" href="#on">#</a> chart.**on**(eventName:String, handler:Function)

These events are included with d3Kit-timeline. The handler function signature is ```function(d,i){...}``` where ```d``` is the data associated with label and ```i``` is index of the data point.

| name | description |
| ---- | ----------- |
| 'dotClick' | Click on a dot on the timeline |
| 'dotMouseover' | Move cursor into a dot on the timeline |
| 'dotMousemove' | Move cursor within a dot on the timeline |
| 'dotMouseout' | Move cursor out of a dot on the timeline |
| 'labelClick' | Click on a label |
| 'labelMouseover' | Move cursor into a label |
| 'labelMousemove' | Move cursor within a label |
| 'labelMouseout' | Move cursor out of a label |
