/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( 'header.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// disable scrolling
		window.addEventListener( 'scroll', noscroll );

		// initial animation
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function spinDatBoi() {
		var coord = $('.loading-spinner').getBBox();
		coord.x + (coord.width/2) +' '+ coord.y + (coord.height/2);
		var sdegree = 0;
		for (int x = 0; x < 1000; x++){
			sdegree ++ ;
			sdegree = sdegree + 2 ;
			var srotate = "rotate(" + sdegree + "deg)";
			$('.loading-spinner').css({
				"-webkit-transform" : srotate,
				"transform" : srotate,
				"-webkit-transform-origin" : "50% 50%",
				"transform-origin" : "50% 50%"
			});
		}
	}

	function startLoading() {
		// simulate loading something..
		var simulationFn = function(instance) {
			window.scrollTo( 0, 0 );
			var progress = 0,
				interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.1, 1 );

					instance.setProgress( progress );

					// reached the end

					if( progress === 1) {
							classie.remove( container, 'loading' );
							classie.add( container, 'loaded' );
							clearInterval( interval );

							var onEndHeaderAnimation = function(ev) {
								if( support.animations ) {
									if( ev.target !== header ) return;
									this.removeEventListener( animEndEventName, onEndHeaderAnimation );
								}

								classie.add( document.body, 'layout-switch' );
								window.removeEventListener( 'scroll', noscroll );
							};

							if( support.animations ) {
								header.addEventListener( animEndEventName, onEndHeaderAnimation );
							}
							else {
								onEndHeaderAnimation();
							}
						}
				}, 200 );
		};

		loader.setProgressFn( simulationFn );
	}

	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();
})();
