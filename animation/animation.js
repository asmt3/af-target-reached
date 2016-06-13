

window.awesomeflix.onReady =  function(timeline) {


	timeline.fromTo($('img'), 1, {
		css: {
			"opacity": 0.5
		}
	}, {
		css: {
			"opacity": 1
		}
	}, '+=0.05')

	return timeline

}
