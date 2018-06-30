/**
 * A plugin which enables rendering of maps
 *
 * @author Tomas Lipovsky
 */
var RevealMapbox = window.RevealMapbox || (function(){

	var options = Reveal.getConfig().mapbox || {};
	options.accessToken = options.accessToken || 'undefined'
	loadMapbox();

	function createMapbox(segment) {
		var mapContainer = document.createElement("div");
		segment.appendChild(mapContainer);
		mapContainer.setAttribute("class", "slide-background stretch");
		mapContainer.style.display = "block";
		mapContainer.style.textAlign = "left";
		mapContainer.style.opacity = "1";
		mapContainer.style.visibility = "visible";
		mapboxgl.accessToken = options.accessToken;
		return new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/streets-v9'
		});
	}

	function loadMapbox() {
		var sections;
		sections = document.querySelectorAll('[data-mapbox]');
		for (var i = 0; i < sections.length; i += 1){
			sections[i].mapbox = createMapbox(sections[i]);
		}
	}

	function flyToJson(mapbox, position){
		position.center = position.center || [0,0]
		position.bearing = position.bearing || 0
		position.zoom = position.zoom || 10
		position.speed = position.speed || 1.2
		position.curve = position.curve || 1.42
		position.pitch = position.pitch || 0
		mapbox.flyTo(position)
	}

	function goCurrentMapPosition(){
		var newFragment = Reveal.getCurrentSlide().querySelectorAll( '.fragment.current-fragment' );
		if ( newFragment.length ){
			newFragment = newFragment[0]
			position = JSON.parse(newFragment.getAttribute("data-mapbox-transform-to"));
		}else{
			if(Reveal.availableFragments().prev == true && Reveal.availableFragments().next == false)
				return;
			currentSlide = Reveal.getCurrentSlide();
			position = JSON.parse(currentSlide.getAttribute("data-mapbox"));
		}
		flyToJson(Reveal.getCurrentSlide().mapbox, position);
	}

	Reveal.addEventListener( 'slidechanged', function( event ) {
		if(!event.currentSlide.hasAttribute("data-mapbox"))
			return;
		Reveal.getCurrentSlide().mapbox.resize()
		goCurrentMapPosition()
	} );

	Reveal.addEventListener( 'fragmentshown', function( event ) {
		if(!event.fragment.hasAttribute("data-mapbox-transform-to"))
			return;
		goCurrentMapPosition()
	} );

	Reveal.addEventListener( 'fragmenthidden', function( event ) {
		if(!event.fragment.hasAttribute("data-mapbox-transform-to"))
			return;
		goCurrentMapPosition();
	} );
})();
