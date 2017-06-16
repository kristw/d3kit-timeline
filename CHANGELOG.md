# d3Kit-timeline

## v2

### v2.0.0

#### Breaking changes

- Accessing the axis via `chart.axis` is deprecated. Please set the `formatAxis` in options instead

```diff
- chart.axis.ticks(0)
+ chart.options({
+   formatAxis: axis => axis.ticks(0)
+ })
```

- Calling `.resizeToFit()` requires a call to `.visualize()` before it.

## v1

### v1.3.1

Draw axis when there is no data. Previous behavior will not draw anything or update the vis at all.

### v1.3.0

Support option `textStyle` for customizing label text style, per this enhancement request [#9](https://github.com/kristw/d3kit-timeline/issues/9).

### v1.2.0

Support `mouseenter` and `mouseleave` events. Thanks to this [pull request](https://github.com/kristw/d3kit-timeline/pull/8).

### v1.1.1

Update dependency (d3kit)

### v1.1.0

#### New API

Add `.resizeToFit()` to address issue [#5](https://github.com/kristw/d3kit-timeline/issues/5). If the direction is *left* or *right*, it will set the width automatically. If the direction is *up* or *down*, it will set the height automatically.

### v1.0.1

Update dependency

### v1.0.0

Instead of exporting `d3Kit` and using the constructor via `d3Kit.Timeline`, this library now return the chart constructor itself.

#### Breaking changes

If you import via the `<script>` tag

```diff
- new d3Kit.Timeline()
+ new d3KitTimeline()
```

If you import via AMD

```diff
- define(['d3kit-timeline'], function(d3Kit)){ ... }
+ define(['d3kit-timeline'], function(d3KitTimeline)){ ... }
```

If you import via CommonJS style

```diff
- var d3Kit = require('d3kit-timeline');
+ var d3KitTimeline = require('d3kit-timeline');
```

#### Minor

- Update labella version in the dependencies.

## v0.x.x

### v0.4.1
- Support Labella 1.x.x that changes API.

### v0.4.0
- Remove .npmignore and add prepublish script to show package size

### v0.3.0-0.3.2
- Do not pull unnecessary files when install via bower

### v0.2.0
- Add support for ```scale``` and ```domain``` in options. Thanks @timelyportfolio for the suggestions.
