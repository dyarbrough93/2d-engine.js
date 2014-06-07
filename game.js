// Global variables
var cw, ch, canvas, ctx, gameObjects = [];

// Global settings
var settings = {
	frameRate: 60
};

// Call init when the window is loaded
window.onload = init;

// Initialize everything and start the game loop
function init()
{
	initCanvas();
	initEventListeners();
	initGameObjects();
	loop();
};

// Create and add the canvas to the document
function initCanvas()
{
	canvas = document.createElement("canvas")
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
function initGameObjects()
{
	gameObjects.push(new Rectangle({
		pos: {
			x: canvas.width / 2,
			y: canvas.height / 2
		},
		vel: {
			x: 1,
			y: 0
		},
		width: 50,
		alpha: 0.1
	}));
	console.log(gameObjects[0]);
}

// Game loop
function loop()
{
	update();
	render();
	setTimeout(loop, 1000 / settings.frameRate);
}

// Update all game elements
function update()
{
	for (var i in gameObjects)
		gameObjects[i].update();
}

// Draw all game elements to the canvas
function render()
{
	ctx.clearRect(0, 0, cw, ch);
	for (var i in gameObjects)
		gameObjects[i].render(ctx);
}