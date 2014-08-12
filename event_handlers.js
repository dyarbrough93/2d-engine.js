/*
 * @file event_handlers
 * File containing some mouse and keyboard handlers to be used with html canvas games
 * @author Davis Yarbrough
 * @date 6/4/2014
 */

var eventHandlers = (function(window) {
	
	/*
	 * Initialize the mouse event handlers
	 * @param canvas The canvas to attach the event listeners to
	 */
	function initMouseEvents(canvas) {
		
		/*
		 * Get mouse position on mouse move
		 */
		canvas.addEventListener("mousemove", function(e)
		{
			mouse.x = (e.pageX - canvas.offsetLeft);
			mouse.y = (e.pageY - canvas.offsetTop);
		});
		
		/*
		 * Mouse down event handler
		 */
		canvas.addEventListener("mousedown", function(e)
		{
			var mousecode = "_" + e.which;
			mouse[mousecode] = true;
		});
		
		/*
		 * Mouse up event handler
		 */
		canvas.addEventListener("mouseup", function(e)
		{
			var mousecode = "_" + e.which;
			mouse[mousecode] = false;
		});
	}
	
	/*
	 * Initialize the key event handlers
	 * @param canvas The canvas to attach the event listeners to
	 */
	function initKeyEvents(canvas) {
		
		canvas.tabIndex = 1000;
		
		/*
		 * Key down event handler
		 */
		canvas.addEventListener("keydown", function(e)
		{
			var keycode = "_" + e.which;
			keys[keycode] = true;
		});
		
		/*
		 * Key up event handler
		 */
		canvas.addEventListener("keyup", function(e)
		{
			var keycode = "_" + e.which;
			keys[keycode] = false;
		});
	}
	
	/*
	 * Check if the parameter key is currently down
	 * @param {keycode} keycode The keycode to check
	 * @return bool
	 */
	function isKeyDown(keycode)
	{
		if (typeof keycode !== 'number')
			throw "isKeyDown: parameter must be a valid keycode.";
			
		keycode = "_" + keycode;
		if (keys.hasOwnProperty(keycode))
			return keys[keycode];
		else
			return false;
	}
	
	/*
	 * Check if the parameter mouse button is currently down
	 * @param {mousecode} mousecode The mousecode to check
	 * @return bool
	 */
	function isMouseButtonDown(mousecode)
	{
		if (typeof mousecode !== "number")
			throw "isMouseButtonDown: parameter must be a valid mouse code.";
			
		mousecode = "_" + mousecode;
		if (mouse.hasOwnProperty(mousecode))
			return mouse[mousecode];
		else
			return false;
	}
	
	/*
	 * Mouse object
	 */
	mouse = {
		x: undefined,
		y: undefined
	};
	
	/*
	 * Keys object
	 */
	keys = {
	};
	
	/*
	 * Javscript mouse codes
	 */
	mousecode = {
		LEFT: 1,
		MIDDLE: 2,
		RIGHT: 3
	};
	
	/*
	 * Javascript key codes
	 */
	keycode = {
		BACKSPACE: 8,
		TAB: 9,
		ENTER: 13,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		CAPS_LOCK: 20,
		ESCAPE: 27,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT_ARROW: 37,
		UP_ARROW: 38,
		RIGHT_ARROW: 39,
		DOWN_ARROW: 40,
		INSERT: 45,
		DELETE: 46,
		_0: 48,
		_1: 49,
		_2: 50,
		_3: 51,
		_4: 52,
		_5: 53,
		_6: 54,
		_7: 55,
		_8: 56,
		_9: 57,
		A: 65,
		B: 66,
		C: 67,
		D: 68,
		E: 69,
		F: 70,
		G: 71,
		H: 72,
		I: 73,
		J: 74,
		K: 75,
		L: 76,
		M: 77,
		N: 78,
		O: 79,
		P: 80,
		Q: 81,
		R: 82,
		S: 83,
		T: 84,
		U: 85,
		V: 86,
		W: 87,
		X: 88,
		Y: 89,
		Z: 90
	};
	
	/*
	 * Module elements we want visible publicly
	 */
	return {
		initMouseEvents   : initMouseEvents,
		initKeyEvents     : initKeyEvents,
		mousecode         : mousecode,
		keycode           : keycode,
		isKeyDown         : isKeyDown,
		isMouseButtonDown : isMouseButtonDown
	};
})(window, undefined);