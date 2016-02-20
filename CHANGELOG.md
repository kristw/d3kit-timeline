# d3Kit-timeline

## v1.x.x

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
