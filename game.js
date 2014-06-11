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
	var object = new Polygon({
		pos: {
			x: 120,
			y: 240
		},
		vel: {
			x: 0,
			y: 0
		},
		width: 50,
		alpha: 0.05,
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
	gameObjects.push(object);
	//object.addForce(-1, -1);
	//console.log(gameObjects[0]);
	grid = new Grid({
		lineColor: 'rgba(0, 0, 0, 1)',
		lineSpacing: 30,
		labelColor: 'black',
	});

}

// Game loop
function loop()
{
	if (eventHandlers.keys.shiftDown)
		paused = false;
	else
		paused = true;

	if (!paused || step) {
		step = false;
		update();
		render();
		//setTimeout(loop, 1000 / settings.frameRate);
	}
	requestAnimationFrame(loop);
}

// Update all game elements
function update()
{
	for (var i in gameObjects)
	{
		gameObjects[i].update();
		gameObjects[i].addForce(0, 0, 0, settings.gravity);
	}
}

// Draw all game elements to the canvas
function render()
{
	ctx.clearRect(0, 0, cw, ch);
	for (var i in gameObjects)
		gameObjects[i].render(ctx);
	grid.render(ctx);
	gameObjects[0].drawInfo(ctx, 12);
}