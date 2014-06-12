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
 	if (!settings.pos)
 		throw "InvalidArguments: Position of GameObject not specified in arguments list";

 	this.pos = settings.pos || new Point(0, 0); // position of the GameObject on the canvas
 	this.vel = settings.vel || {x: 0, y: 0}; // velocity of the GameObject
 	this.rotation = settings.rotation || 0; // rotation of the object from its default, in radians
 	this.alpha = settings.alpha || 0; // angular velocity of the GameObject
 	this.mass = settings.mass || 1; // mass of the GameObject
 	this.color = settings.color || 'black'; // color of the GameObject
	this.selected = false; // whether or not this object is selected
	this.wireframe = settings.wireframe || false; // whether or not to draw this object with a wireframe
 })
 	.methods({
		/*
		 * Update the GameObject for rendering
		 */
 		update: function () {
 			this.pos.x += this.vel.x;
 			this.pos.y += this.vel.y;
 			this.rotation += this.alpha;
 			if (this.rotation >= 2 * Math.PI)
 				this.rotation = 0;
 		},
		/*
		 * Render the GameObject
		 * @param ctx The context to render to
		 */
 		render: function (ctx) {
			if (!this.wireframe)
			{
				ctx.fillStyle = this.color;
				ctx.fill();
			} 
			else
			{
				ctx.strokeStyle = this.color;
				ctx.stroke();
			}
			ctx.restore();
			ctx.fillRect(this.pos.x - 1, this.pos.y - 1, 3, 3);
		},
		/*
		 * Add a force to the GameObject at the specificed position
		 * @param x, y Coordinates to add the force at
		 * @param Fx, Fy X and y magnitudes of the force to add
		 */
 		addForce: function (x, y, Fx, Fy) {
 			var ax, ay;
 			ax = Fx / this.mass;
 			ay = Fy / this.mass;

 			this.vel.x += ax;
 			this.vel.y += ay;
 		},
		/*
		 * Draw relevant info about the GameObject to the canvas
		 * @param ctx The context to render to
		 * @param spacing How far apart each line should be from the one before it
		 */
 		drawInfo: function (ctx, spacing) {
 			ctx.fillStyle = 'white';
 			ctx.fillRect(0, 0, 120, 180);
 			ctx.fillStyle = 'black';
			ctx.font = '10px Arial';
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
 * Circle class
 * @param settings Object containing initializations for the circle
 */
var Circle = GameObject.extend(function (settings) {
	if (!settings.radius)
		throw "InvalidArguments: Circle must be provided with a radius in the arguments list"
	this.radius = settings.radius;
	this.AABB = { // axis-aligned bounding box
		left: settings.pos.x - settings.radius,
		right: settings.pos.x - settings.radius,
		top: settings.pos.y - settings.radius,
		bottom: settings.pos.y + settings.radius,
		fill: 'rgba(0, 0, 0, 0.3)'
	}
})
	.methods({
		update: function () {
			this.supr();
			this.updateAABB();
		},
		updateAABB: function () {
			this.AABB.left = this.pos.x - this.radius;
			this.AABB.right = this.pos.x + this.radius;
			this.AABB.top = this.pos.y - this.radius;
			this.AABB.bottom = this.pos.y + this.radius;
		},
		collidesWith: function(other) {
			// Check if AABBs collide
			if (!(this.AABB.left > other.AABB.right ||
				  this.AABB.right < other.AABB.left ||
				  this.AABB.top > other.AABB.bottom ||
				  this.AABB.bottom < other.AABB.top))
			{
				this.AABB.fill = 'rgba(255, 0, 0, 0.3)';
				other.AABB.fill = 'rgba(255, 0, 0, 0.3)';
			}
		},
		render: function (ctx) {
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
			this.supr(ctx);

			// render AABB
			ctx.fillStyle = this.AABB.fill;
			ctx.fillRect(this.AABB.left, this.AABB.top, this.AABB.right - this.AABB.left, this.AABB.bottom - this.AABB.top);
		},
		addForce: function (x, y, Fx, Fy) {
			this.supr(x, y, Fx, Fy);
		},
		drawInfo: function (ctx, spacing) {
			this.supr(ctx, spacing);
			ctx.fillText("radius: " + this.radius, 0, spacing * 8);
		}
	});

/*
 * Polygon class
 * @param settings Object containing initializations for the polygon
 * @param matrix Matrix of Points representing the polygon as positioned around the coordinates (0, 0)
 */
var Polygon = GameObject.extend(function (settings) {
	if (!settings.matrix)
		if (!settings.width || !settings.height)
			throw "InvalidArguments: Polygon must be provided with either a matrix of points or a width and height in the arguments list"

	// if no matrix is provided, set up as a rectangle
	this.matrix = settings.matrix || [new Point(-settings.width / 2, settings.height / 2), 
									  new Point(-settings.width / 2, -settings.height / 2), 
									  new Point(settings.width / 2, -settings.height / 2), 
									  new Point(settings.width / 2, settings.height / 2)];
	this.AABB = { // axis-aligned bounding box
		findLeft: function(matrix) {
			var min = Number.MAX_VALUE;
			for (var i = 0; i < matrix.length; i++)
			{
				var curr = matrix[i].x;
				if (curr < min)
					min = curr;
			}
			return min;
		},
		findRight: function(matrix) {
			var max = Number.MIN_VALUE;
			for (var i = 0; i < matrix.length; i++)
			{
				var curr = matrix[i].x;
				if (curr > max)
					max = curr;
			}
			return max;
		},
		findTop: function(matrix) {
			var min = Number.MAX_VALUE;
			for (var i = 0; i < matrix.length; i++)
			{
				var curr = matrix[i].y;
				if (curr < min)
					min = curr;
			}
			return min;
		},
		findBottom: function(matrix) {
			var max = Number.MIN_VALUE;
			for (var i = 0; i < matrix.length; i++)
			{
				var curr = matrix[i].y;
				if (curr > max)
					max = curr;
			}
			return max;
		},
		fill: "rgba(0, 0, 0, 0.3)"
	}
	this.AABB.left = this.AABB.findLeft(this.matrix) + this.pos.x;
	this.AABB.right = this.AABB.findRight(this.matrix) + this.pos.x;
	this.AABB.top = this.AABB.findTop(this.matrix) + this.pos.y;
	this.AABB.bottom = this.AABB.findBottom(this.matrix) + this.pos.y;
})
	.methods({
		update: function () {
			this.supr();
			if (this.alpha !== 0)
				this.updateMatrix();

			this.updateAABB();
		},
		updateMatrix: function() {
			for (var i = 0; i < this.matrix.length; i++)
				this.matrix[i].rotate(new Point(0, 0), this.alpha);
		},
		updateAABB: function () {
			this.AABB.left = this.AABB.findLeft(this.matrix) + this.pos.x;
			this.AABB.right = this.AABB.findRight(this.matrix) + this.pos.x;
			this.AABB.top = this.AABB.findTop(this.matrix) + this.pos.y;
			this.AABB.bottom = this.AABB.findBottom(this.matrix) + this.pos.y;
		},
		collidesWith: function(other) {
			// Check if AABBs collide
			if (!(this.AABB.left > other.AABB.right ||
				  this.AABB.right < other.AABB.left ||
				  this.AABB.top > other.AABB.bottom ||
				  this.AABB.bottom < other.AABB.top))
			{
				this.AABB.fill = 'rgba(255, 0, 0, 0.3)';
				other.AABB.fill = 'rgba(255, 0, 0, 0.3)';
			}
		},
		render: function (ctx) {
			ctx.save();
			ctx.translate(this.pos.x, this.pos.y);
			ctx.beginPath();
			ctx.moveTo(this.matrix[0].x, this.matrix[0].y);
			for (var i = 0; i < this.matrix.length - 1; i++) 
				ctx.lineTo(this.matrix[i + 1].x, this.matrix[i + 1].y);
			ctx.closePath();
			this.supr(ctx);

			// render the AABB
			ctx.fillStyle = this.AABB.fill;
			ctx.fillRect(this.AABB.left, this.AABB.top, this.AABB.right - this.AABB.left, this.AABB.bottom - this.AABB.top);
		},
		addForce: function (x, y, Fx, Fy) {
			this.supr(x, y, Fx, Fy);
		},
		drawInfo: function (ctx, spacing) {
			this.supr(ctx, spacing);
			ctx.fillText("matrix: ", 0, spacing * 8);
			for (var i = 0; i < this.matrix.length; i++)
				ctx.fillText("{" + (this.matrix[i].x).toFixed(2) + ", " + (this.matrix[i].y).toFixed(2) + "}", 40, spacing * (8 + i));
		}
	});