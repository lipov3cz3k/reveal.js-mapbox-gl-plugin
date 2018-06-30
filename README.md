# Reveal.js plugin - mapbox-gl

[Reveal.js](https://github.com/hakimel/reveal.js) plugin to embed interactive maps in slides

## Installation

### Manual

1. Copy the file `mapbox-gl.js` into the plugin folder of your reveal.js presentation, i.e. `plugin/mapbox-gl`.

2. Add the plugins to the dependencies in your presentation

```javascript
Reveal.initialize({
	// ...
	dependencies: [
		// ...
		{ src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js' },
		{ src: 'plugin/mapbox-gl/mapbox-gl.js'},
		// ...
	],
	mapbox: {accessToken: "YOUR ACCESS TOKEN"}
});
```
3. Add CSS import
```html
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css' rel='stylesheet' />
```

### Adding mapbox to slides

To add a mapbox to your presentation, simply create a container element with the
attribute `data-mapbox` with the JSON configuration. The configuration can contain `duration`, `zoom`, `bearing` and `center`.
Center has to be a list `[lon, lat]`.

```html
<section data-mapbox='{"duration":4000, "zoom":13, "bearing":0, "center":[16.2957322, 50.1173050]}'>
	<span class="fragment current-visible" data-mapbox-transform-to='{"duration":4000, "zoom":10, "bearing":0, "center":[36.8227, -1.2847]}'></span>
</section>
```

## License

MIT licensed

Copyright (C) 2018 Tomas Lipovsky