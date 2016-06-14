var app = angular.module('AwesomeApp', ['ngSanitize'])

app.controller('AwesomeController', function ($http, $timeout, $scope) {

	// this gets set as soon as the JSON is available
	$scope.animation_html_src = false

	// download JSON to include
	$http.get('animation/input.json').then(function(response){
		$scope.data = response.data;

		$scope.animation_html_src = 'animation/animation.html'
	})

})

// calls awesomeflix.triggerReady when all images are ready
// calls the same function but with different params if there was an image missing
app.directive('watchimages', ['$timeout', '$window', function ($timeout, $window) {

    return {
        restrict: 'A',
        link: function (scope, parentElement) {

        	var totalImagesWatched = 0
        	var totalImagesLoaded = 0

			function _checkComplete() {

				console.log(totalImagesLoaded + '/' + totalImagesWatched)

				if (totalImagesWatched == totalImagesLoaded) {
					console.log('all img is loaded')	

					$window.awesomeflix.triggerReady();

				}

			}


			// $timeout ensures that ng-repeats have time to execute
        	$timeout(function() {

        		var img = parentElement.find('img')

        		totalImagesWatched = img.length

        		// detect cached images
        		angular.forEach(img, function(a_img){
        			if (a_img.complete && (a_img.width+a_img.height) > 0) {
	        			console.log('cached')
	        			totalImagesLoaded++
	        			_checkComplete()
	        		} 	
        		})
        		
        		// detect loaded images
	            img.bind('load', function () {

	            	console.log(this.src + ' loaded')
	            	
					totalImagesLoaded++
					_checkComplete()	
	                
	            })

	            // detech image errors
	            img.bind('error', function () {

	            	console.error(this.src + ' did not load')

	            	$window.awesomeflix.triggerImageError(this.src);
	            	
	            })

        	})
        }
    };
}]);







