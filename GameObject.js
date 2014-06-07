/**
 * @file GameObject.js
 * Base class for an html5 canvas game object
 * @author Davis Yarbrough
 * @date 6/7/2014
 */

/*
 * GameObject superclass
 * @param settings Object containing initializations for the GameObject
 */
 var GameObject = klass(function (settings) {
 	this.pos = settings.pos || {x: 0, y: 0}; // position of the GameObject on the canvas
 	this.vel = settings.vel || {x: 0, y: 0}; // velocity of the GameObject
 	this.rotation = settings.rotation || 0; // rotation of the object from its default, in radians
 	this.alpha = settings.alpha || 0; // angular velocity of the GameObject
 	this.mass = settings.mass || 1; // mass of the GameObject
 	this.color = settings.color || 'black'; // color of the GameObject
 })
 	.methods({
 		update: function () {
 			this.pos.x += this.vel.x;
 			this.pos.y += this.vel.y;
 			this.rotation += this.alpha;
 			if (this.rotation >= 2 * Math.PI)
 				this.rotation = 0;
 		},
 		render: function (ctx) {},
 		drawInfo: function (ctx, spacing) {
 			ctx.fillText("x-position: " + this.pos.x, 0, spacing * 1);
 			ctx.fillText("y-position: " + this.pos.y, 0, spacing * 2);
 			ctx.fillText("x-velocity: " + this.vel.x, 0, spacing * 3);
 			ctx.fillText("y-velocity: " + this.vel.y, 0, spacing * 4);
 			ctx.fillText("angular velocity: " + this.alpha, 0, spacing * 5);
 			ctx.fillText("rotation: " + (this.rotation / Math.PI).toFixed(2) + "\u03C0", 0, spacing * 6);
 			ctx.fillText("mass: " + this.mass, 0, spacing * 7);
 		}
 	});

/*
 * Ball class
 */
var Circle = GameObject.extend(function (settings) {
	this.radius = settings.radius || 1;
})
	.methods({
		update: function () {
			this.supr();
		},
		render: function (ctx) {
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
			ctx.fill();
		}
	});

/*
 * Rectangle class
 */
var Rectangle = GameObject.extend(function (settings) {
	this.width = settings.width || 5; // width of the rectangle
	this.height= settings.height || 5; // height of the rectangle
})
	.methods({
		update: function () {
			this.supr();
		},
		render: function (ctx) {
			ctx.save();
			ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
			ctx.rotate(this.rotation);
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.fillRect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
			ctx.restore();
			this.drawInfo(ctx, 12);
		},
		drawInfo: function (ctx, spacing) {
			this.supr(ctx, spacing);
			ctx.fillText("width: " + this.width, 0, spacing * 8);
			ctx.fillText("height: " + this.height, 0, spacing * 9);
		}
	})