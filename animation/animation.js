

window.awesomeflix.onReady =  function(timeline) {



	var slidesContainer = $("#slides-container")

	// slides
	var slides = {
		slideCongrats: {
			container: $("#slide-congrats"),
			animation: function(timeline){

				timeline.from($(this).find('.thingy'), 0.5, {
					css: {
						"margin-top":"-100%"
					},
					ease: Bounce.easeOut
				})

				timeline.to($(this).find('.thingy'), 0.5, {
					css: {
						"margin-top":"5%",
						'font-size': '18px'
					},
					ease: Bounce.easeOut
				}, '+=1.5')

				timeline.from($(this).find('.profile-image-holder'), 0.5, {
					css: {
						"left":"700px",
						rotation:"360deg",
					}
				}, '+=0.05')

			},
			transitionInOffset: '0'
			
		},
		slideTarget: {
			container: $("#slide-target"),
			animation: function(timeline){

				timeline.to($(this).find('.chart .pie'), 0.5, {
					css: {
						"stroke-dasharray": "1130,0"
					}
				}, '-=0.5')

				timeline.to($(this).find('.foreground'), 0.1, {
					css: {
						"opacity": "0"
					}
				}, '+=1')

				timeline.to($(this).find('.background'), 1, {
					css: {
						"opacity": "1"
					}
				}, '-=1')

				timeline.to($(this).find('.chart .pie'), 0.5, {
					css: {
						"stroke-dasharray": "0,1130"
					}
				}, '-=0.01')

				

			},
			transitionInOffset: '+=2'
			
		},
		slideSupporters: {
			container: $("#slide-supporters"),
			animation: function(timeline){


				// timeline.staggerTo($(this).find('.boxes li'), 1, {
				// 	css: {
				// 		'margin-top': 0
				// 	}

				// }, 1, '+=0.05')

				// timeline.staggerTo($(this).find('.boxes li'), 1, {
				// 	css: {
				// 		'opacity': 1
				// 	}

				// }, 1, '-=1')

			},
			transitionInOffset: '+=2'
			
		},

		slideLogo: {
			container: $("#slide-logo"),
			animation: function(timeline){

				// Wait two seconds and then fade out for one second
				// timeline.to($(this), 1, {
				// 	alpha: 0
				// }, '+=2')

			},
			transitionInOffset: '+=2.5'
			
		},
	}


	function buildTimeline(slideNamesOnly) {

		// if slideNamesOnly is specified
		// limit to these names
		var slideNamesOnly = slideNamesOnly || Object.keys(slides)

		if (slideNamesOnly.length == 0) slideNamesOnly = Object.keys(slides)

		// fade the whole thing in
		timeline.set(slidesContainer, {
			"alpha": 0
		});

		timeline.to(slidesContainer, 1, {
			"alpha": 1
		});


		var firstSlide = true

		for(slideNameIndex in slideNamesOnly) {
			
			var slideName = slideNamesOnly[slideNameIndex]
			var slide = slides[slideName]
			var slideOffset = slide.container.position().left
			var transitionDuration = slide.transitionDuration || 1
			var transitionInOffset = slide.transitionInOffset || "+=0.5"


			if (firstSlide) {

				// start at the first slide, obvs
				slidesContainer.css('margin-left', -slideOffset)
				firstSlide = false
			} else {
				// move to slide
				timeline.to(slidesContainer, transitionDuration, {
					ease: Power4.easeOut,
					marginLeft: -slideOffset
				}, transitionInOffset)

			}
			
			// slide animation
			slide.animation.apply(slide.container, [timeline])
			
		}


	} 

	
	// buildTimeline([
	// 	// "slideCongrats",
	// 	// "slideTarget",
	// 	"slideSupporters",
	// 	// "slideLogo"
	// ]);

	buildTimeline();


	return timeline

}

