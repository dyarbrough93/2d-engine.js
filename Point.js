/**
 * @file Point.js
 * Object representation of a 2d point
 * @author Davis Yarbrough
 * @date 6/10/2014
 */

var Point = klass(function(x, y) {
	this.x = x;
	this.y = y;
})
	.methods({
		/*
		 * Rotates this point around another the specified number of radians
		 * @param other Point to rotate around
		 * @param radians How many radians to rotate
		 */
		rotate: function(other, radians) {
			
			var s = Math.sin(radians);
			var c = Math.cos(radians);

			// tranlate point back to origin
			this.x -= other.x;
			this.y -= other.y;

			// rotate point
			var newx = this.x * c - this.y * s;
			var newy = this.x * s + this.y * c;

			// translate point back to global coords
			this.x = newx + other.x;
			this.y = newy + other.y;
		},
	})
;