// Global variables
var cw, ch, canvas, ctx, gameObjects, grid, flag, paused, step;

// Global settings
var settings = {
	frameRate: 60,
	gravity: 0
};

// Call init when the window is loaded
window.onload = init;

// Initialize everything and start the game loop
function init()
{
	initGlobalVariables();
	initCanvas();
	initEventListeners();
	initGameElements();
	loop();
}

// Initialize all global variables
function initGlobalVariables()
{
	gameObjects = [];
	flag = true;
	paused = true;
	step = false;
}

// Create and add the canvas to the document
function initCanvas()
{
	canvas = document.createElement("canvas");
	document.body.children[0].appendChild(canvas);
	ctx = canvas.getContext("2d");
	cw = canvas.width = window.innerWidth - 100;
	ch = canvas.height = window.innerHeight - 50;
}

// Handle initialization of all event listeners
function initEventListeners()
{
	// Mouse and key event handlers
	eventHandlers.initMouseEvents(canvas);
	eventHandlers.initKeyEvents(canvas);
	
	// Keep the canvas approximately the same size as the window
	window.onresize = function() {
		cw = canvas.width = window.innerWidth - 100;
		ch = canvas.height = window.innerHeight - 50;
	};
}

// Initializae all GameObjects
function initGameElements()
{
	var polygon = new Polygon({
		pos: {
			x: 120,
			y: 240
		},
		vel: {
			x: 1,
			y: 1
		},
		//width: 50,
		alpha: 0.1,
		matrix: [
			new Point(-40, -35),
			new Point(-30, 30),
			new Point(5, 10),
			new Point(30, 32),
			new Point(30, -30)
		],
		wireframe: false,
		color: 'red'
	});
	gameObjects.push(polygon);
	var polygon_2 = new Polygon({
		pos: {
			x: 270,
			y: 390
		},
		vel: {
			x: -1,
			y: -1
		},
		alpha: -0.1,
		matrix: [
			new Point(-10, 15),
			new Point(6, 8),
			new Point(1, -12),
			new Point (-13, -18)
		],
		color: 'green'
	});
	gameObjects.push(polygon_2);
	var square = new Polygon({
		pos: {
			x: 480,
			y: 360
		},
		vel: {
			x: 0.5,
			y: 0
		},
		alpha: 0.1,
		width: 40,
		height: 40, 
		color: 'blue'
	});
	gameObjects.push(square);
	var circle = new Circle({
		pos: {
			x: 630,
			y: 360
		},
		vel: {
			x: -0.1,
			y: -.1
		},
		radius: 15,
		color: 'red',
		wireframe: true
	});
	gameObjects.push(circle);
	//object.addForce(-1, -1);
	//console.log(gameObjects[0]);
	grid = new Grid({
		lineColor: 'rgba(0, 0, 0, 1)',
		lineSpacing: 30,
		labelColor: 'black'
	});
}

// Game loop
function loop()
{
	paused = eventHandlers.isKeyDown(keycode.SHIFT);
	if (!paused || step) {
		step = false;
		update();
		checkCollisions();
		//resolveCollisions();
		render();
	}
	requestAnimationFrame(loop, 1000 / 60);
}

// Update all game elements
function update()
{
	for (var i in gameObjects)
		gameObjects[i].AABB.fill = 'rgba(0, 0, 0, 0.3)';

	for (var i in gameObjects)
	{
		gameObjects[i].update();
		gameObjects[i].addForce(0, 0, 0, settings.gravity);
	}
}

// Check if any objects are currently colliding
function checkCollisions() {
	for (var i = 0; i < gameObjects.length; i++)
	{
		for (var j = i + 1; j < gameObjects.length; j++)
		{
			gameObjects[i].collidesWith(gameObjects[j]);
		}
	}
}

// Draw all game elements to the canvas
function render()
{
	ctx.clearRect(0, 0, cw, ch);
	grid.render(ctx);
	for (var i in gameObjects)
		gameObjects[i].render(ctx);
	
}