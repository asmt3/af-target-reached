var awesomeflix = Object.create({

	_timeline: new TimelineMax({"pause": true}),

	ui: {
		totalProgressValue: null,
		totalTimeValue: null,
		restartBtn: null,
		playBtn: null,
		pauseBtn: null,
		totalProgressSlider: null
	},

	// to be overwritten
	onReady: function(timeline) {
		console.log('onReady was not overwritten')
	},

	triggerReady: function() {
		console.log('ready')

		// create animation timeline
		this._timeline = this.onReady(this._timeline)
		this.callPhantom('animationReady', null)
		this.initUI()
	},

	triggerImageError: function(src) {
		console.log('image error:  ' + src)
		this.callPhantom('imageError', src)
	},

	callPhantom: function(fn, data){

		if (typeof window.callPhantom === 'function') {
		  window.callPhantom({ 
		  	"function": fn,
		  	"data": data
		  })
		} else {
			console.log('callPhantom not defined, would have passed: ')
			console.log(fn, data)
		}

	},

	// functions used by browser
	initUI: function() {
		this.ui.totalProgressValue = $("#totalProgressValue"),
		this.ui.totalTimeValue = $("#totalTimeValue"),
		this.ui.restartBtn = $("#restartBtn"),
		this.ui.playBtn = $("#playBtn"),
		this.ui.pauseBtn = $("#pauseBtn")
	
		/* config sliders */
		this.ui.totalProgressSlider = $("#totalProgressSlider").slider({
            range: false,
            min: 0,
            max: 100,
			step:.1,
            slide: function ( event, ui ) {
				awesomeflix._timeline.pause();
				awesomeflix._timeline.totalProgress( ui.value/100 );
            }
        });
	  
	 
		/* callbacks */
		this._timeline.eventCallback('onUpdate', this.updateUI);
			  	
		this.ui.restartBtn.click(function() {
			//Start playing from a progress of 0.
			awesomeflix._timeline.restart();
		});

		this.ui.playBtn.click(function() {
			//Start playing from a progress of 0.
			awesomeflix._timeline.play();
		});

		this.ui.pauseBtn.click(function() {
			//Start playing from a progress of 0.
			awesomeflix._timeline.pause();
		});

	},

	updateUI: function() {
		//change slider value
		awesomeflix.ui.totalProgressSlider.slider("value", awesomeflix._timeline.totalProgress()*100);
		
		//update display of values
		awesomeflix.ui.totalProgressValue.html(awesomeflix._timeline.totalProgress().toFixed(2));
		awesomeflix.ui.totalTimeValue.html(awesomeflix._timeline.totalTime().toFixed(2));
	},

	// functions used by phantomJs
	pauseAnimationAt: function(time) {

	    this._timeline.pause(time, false); // timeline is a TimelineMax instance
	},

	getTotalDurationInSeconds: function() {
	    return this._timeline.totalDuration();
	}
})
