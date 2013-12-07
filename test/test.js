// load the module
var PerlinGenerator = require('../lib/proc-noise');
var Perlin = new PerlinGenerator();
console.log( Perlin.noise( 817.2 ) ); // one dimensional
console.log( Perlin.noise( 9192, 818.53 ) ); // two dimensional
console.log( Perlin.noise( 5, 7, 9.22 ) ); // three dimensional