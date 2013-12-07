# Processing's Noise() Functionality for Node.js

## lol wat?

This is basically a one-to-one port of [Processing's noise() functionality](http://processing.org/reference/noise_.html) from Java to Javascript for Node.js. Since Javascript's `Math.random()` has no seeding capability, I've used the wonderful [Alea](https://github.com/coverslide/node-alea) pseudo-random number generator instead.

## Usage

Using it is pretty simple:

    var PerlinGenerator = require("proc-noise");
	var Perlin = new PerlinGenerator(); // seeds itself if no seed is given as an argument
	console.log( Perlin.noise( 817.2 ) ); // one dimensional
	console.log( Perlin.noise( 9192, 818.53 ) ); // two dimensional
	console.log( Perlin.noise( 5, 7, 9.22 ) ); // three dimensional

Initializing the module returns a randomly-seeded Perlin Noise object. If you want, you can pass it a seed either when initializing it with `new`, or later using the `noiseSeed(seed)` method.

The generated `Perlin` object has four methods: `noise(x, y, z)`, `noiseSeed(seed)`, `noiseReseed()`, and `noiseDetail(lod, falloff)`.

The `noise(x, y, z)` function can take one, two, or three arguments, depending on how many dimensions you want to use. This function will always return a number between 0.0 and 1.0.

By default, the Perlin object seeds itself using a random Alea seed, but you can set your own seed using `noiseSeed(seed)`. This obviously resets the generator with new values.

To reseed the Perlin object with a new random seed, just use `noiseReseed()`. This obviously resets the generator with new values.

To change the level of detail and falloff of the Perlin object, use `noiseDetail(lod, falloff)`. The `falloff` argument is optional. By default, the level of detail is 4 octaves, and the amplitude falloff is 0.5. To be totally honest, I don't fully understand the math of this, but it's here if you want to use it.

## Examples

Two examples are provided in the `test/` directory. To run them, use `node`, of course. `test.js` just prints out some noise values. `visual.js` is more complicated, providing a webpage for you to see the noise function in action in two dimensions via the often-seen randomly-generated noise cloud.

## The Original

The original code from Processing is deep in [here](https://github.com/processing/processing/blob/master/core/src/processing/core/PApplet.java). It has plenty of comments if you're interested in learning more about it.

## Why?

I tried using the [simplex-noise](https://github.com/jwagner/simplex-noise.js) module and it gave me very different results than what I was used to in Processing. I'm not sure why, so I just ported the Processing noise() implementation over as the quickest solution. That's probably a silly way to go about it, but whatever, lol.