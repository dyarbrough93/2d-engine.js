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
 		addForce: function (Fx, Fy) {
 			var ax, ay;
 			ax = Fx / this.mass;
 			ay = Fy / this.mass;

 			this.vel.x += ax;
 			this.vel.y += ay;
 		},
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
			this.drawInfo(ctx, 12);
		},
		addForce: function (Fx, Fy) {
			this.supr(Fx, Fy);
		},
		drawInfo: function (ctx, spacing) {
			this.supr(ctx, spacing);
			ctx.fillText("radius: " + this.radius, 0, spacing * 8);
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
			ctx.translate(this.pos.x, this.pos.y);
			ctx.rotate(this.rotation);
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.fillRect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
			ctx.restore();
			this.drawInfo(ctx, 12);
		},
		addForce: function () {
			this.supr(Fx, Fy);
		},
		drawInfo: function (ctx, spacing) {
			this.supr(ctx, spacing);
			ctx.fillText("width: " + this.width, 0, spacing * 8);
			ctx.fillText("height: " + this.height, 0, spacing * 9);
		}
	});

/*
 * Polygon class
 * @param matrix Matrix of points representing the polygon as positioned around the coordinates (0, 0)
 */
var Polygon = GameObject.extend(function (settings) {
	this.matrix = settings.matrix;
})
	.methods({
		update: function () {
			this.supr();
		},
		render: function (ctx) {
			ctx.save();
			ctx.translate(this.pos.x, this.pos.y);
			ctx.rotate(this.rotation);
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.moveTo(this.matrix[0].x, this.matrix[0].y);
			for (var i = 0; i < this.matrix.length - 1; i++) 
				ctx.lineTo(this.matrix[i + 1].x, this.matrix[i + 1].y);
			ctx.closePath();
			//ctx.fill();
			ctx.stroke();
			ctx.restore();
			this.drawInfo(ctx, 12);
		},
		addForce: function (Fx, Fy) {
			this.supr(Fx, Fy);
		},
		drawInfo: function (ctx, spacing) {
			this.supr(ctx, spacing);
			ctx.fillText("matrix: ", 0, spacing * 8);
			for (var i = 0; i < this.matrix.length; i++)
			{
				ctx.fillText("{" + this.matrix[i].x + ", " + this.matrix[i].y + "}", 40, spacing * (8 + i));
			}
		}
	});
