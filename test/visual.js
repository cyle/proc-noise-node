/*

	this is a cool little visualization of the Perlin noise functionality

	this creates a basic HTTP server, and when you visit it, it'll draw a neat noise cloud
	using 10px by 10px squares, based on a random "noise_scale" which helps figure
	how smooooooth the noise is

	the lower the noise_scale, the smoother it is
	
	refresh the page to get a new noise cloud
	
*/

var http = require("http");
var PerlinGenerator = require('../lib/proc-noise');
var Perlin = new PerlinGenerator();

var noise_scale = 0.07; // very smooth
var noise_min = 0.005;
var noise_max = 1.0;

function randomFloat(min, max) {
	return min + (max - min) * Math.random();
}

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	Perlin.noiseReseed();
	noise_scale = randomFloat(noise_min, noise_max);
	var html = '';
	html += '<!DOCTYPE html>' + "\n";
	html += '<html><body>';
	html += '<p>Noise scale is currently: '+noise_scale+' (min: '+noise_min+', max: '+noise_max+')</p>';
	html += '<canvas id="c" width="500" height="500"></canvas>' + "\n";
	html += '<script type="text/javascript">var c = document.getElementById("c"); var ctx = c.getContext("2d");' + "\n";
	for (var x = 0; x < 50; x++) {
		for (var y = 0; y < 50; y++) {
			var noiseval = Perlin.noise(x * noise_scale, y * noise_scale);
			html += 'ctx.beginPath();' + "\n";
			html += 'ctx.rect('+(x*10)+', '+(y*10)+', 10, 10);' + "\n";
			// to show the gradient...
			var greyval = Math.round(noiseval * 255);
			html += 'ctx.fillStyle = "rgb('+greyval+', '+greyval+', '+greyval+')";' + "\n";
			html += 'ctx.fill();' + "\n";
		}
	}
	html += '</script>' + "\n";
	html +='</body></html>';
	res.end(html);
}).listen(1337);
console.log('Server running at http://localhost:1337/');