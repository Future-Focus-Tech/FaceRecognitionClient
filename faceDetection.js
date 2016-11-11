
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var tracker = new tracking.ObjectTracker('face');

tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);
tracking.track('#video', tracker, { camera: true });

var faces = [];
var faceData;
var timeIntervalId;
var getImageFrame = function(){
	if(faceData){
		faces.push(faceData);
	}
	if (faces.length == 3){
		clearInterval(timeIntervalId);
		$.post('http://10.136.22.206:9090',faces);
	}
};

tracker.on('track', function(event) {
	if(!timeIntervalId)
		timeIntervalId = setInterval(getImageFrame, 3000);
	context.clearRect(0, 0, canvas.width, canvas.height);
	event.data.forEach(function(rect) {
    	context.drawImage(video, 320, 240);
		context.strokeStyle = '#ff0000';
		context.strokeRect(rect.x, rect.y, rect.width, rect.height);
		context.font = '11px Helvetica';
		context.fillStyle = "#fff";
		context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
		context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
		faceData = context.getImageData(rect.x, rect.y, rect.width, rect.height);
    });
});
