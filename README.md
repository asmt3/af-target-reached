# Awesomeflix - blank template

## Developing
1. Clone this repo
2. Do ```npm install```
3. Run ```http-server``` in the base folder (not in ```animation/```)
4. Visit http://127.0.0.1:8080
5. Open developer tools
4. Add animation HTML to ```animation/animation.html```
7. Add assets to ```animation/img/```
8. Install fonts, locally 
6. Add animation CSS to ```animation/animation.css```
7. Create test input for the animation and place in ```animation/input.json```
8. Add approriate bindings in ```animation/animation.js``` (NB. All imported data is in $scope.data)

## Create and push to gh-pages branch
1. ``` git checkout -b gh-pages ```
1. ``` git push --set-upstream origin gh-pages ```
3. Check http://asmt3.github.io/<repo name>/ is available
1. Move to parent folder
2. Add this folder to ```aws-upload.conf.js```
2. ```s3-upload```

## Testing Video Creation
1. Create ```video.json``` in this folder
	```
	{
		"input": {
			"html": "https://s3-ap-northeast-1.amazonaws.com/test-animations/***/index.html",
			"mp3": "https://s3-ap-northeast-1.amazonaws.com/test-animations/***/animation/audio.mp3",
			"data": {
				/* your test data for video */
			}

		},
		"upload": true

	}
	```

2. Post this JSON to the API

	```
	curl -H "Content-Type: application/json" -X POST --data @video.json http://127.0.0.1:3000/videos/test
	```

3. Visit Frontend website to view result
Or just go to: awesomeflix.firebaseio.com/videos

## 


## Deploying
1. Make sure you're building the whole timeline

