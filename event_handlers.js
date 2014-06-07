/*
 * @file event_handlers
 * File containing some mouse and keyboard handlers to be used with html canvas games
 * @author Davis Yarbrough
 * @date 6/4/2014
 */

var eventHandlers = {
	
	/*
	 * Initialize the mouse event handlers
	 * @param canvas The canvas to attach the event listeners to
	 */
	initMouseEvents: function(canvas) {
		
		// Get mouse position on mouse move
		canvas.onmousemove = function(e) 
		{
			eventHandlers.mouse.x = (e.pageX - canvas.offsetLeft);
			eventHandlers.mouse.y = (e.pageY - canvas.offsetTop);
		}
		
		// Modify mouse object values on mouse down
		canvas.onmousedown = function(e)
		{	
			if (e.which === eventHandlers.mousecodes.LEFT) 
			{
				eventHandlers.mouse.leftDown = true;
				console.log(eventHandlers.mouse.x + ", " + eventHandlers.mouse.y);
			}
			else if (e.which ===  eventHandlers.mousecodes.RIGHT)
				eventHandlers.mouse.rightDown = true;
			else if (e.which === eventHandlers.mousecodes.MIDDLE)
				eventHandlers.mouse.middleDown = true;
			else
				;//throw "Mouse code not recognized.";
		};
		
		// Modify mouse object values on mouse up
		canvas.onmouseup = function(e)
		{
			if (e.which === eventHandlers.mousecodes.LEFT)
				eventHandlers.mouse.leftDown = false;
			else if (e.which ===  eventHandlers.mousecodes.RIGHT)
				eventHandlers.mouse.rightDown = false;
			else if (e.which === eventHandlers.mousecodes.MIDDLE)
				eventHandlers.mouse.middleDown = false;
			else
				;//throw "Mouse code not recognized.";
		};
	},
	
	/*
	 * Initialize the key event handlers
	 * @param canvas The canvas to attach the event listeners to
	 */
	initKeyEvents: function(canvas) {
		
		canvas.tabIndex = 1000;
		//canvas.style.outline = "none"; // Uncomment this if you want to remove the highlighting that some browsers will apply to the canvas when it is given focus
		
		// Keydown event handler
		canvas.onkeydown = function(e) {
			switch(e.which) {
				case eventHandlers.keycodes.BACKSPACE: 
					console.log("hi");
					eventHandlers.keys.backspaceDown = true;
					break;
				case eventHandlers.keycodes.TAB:
					eventHandlers.keys.tabDown = true;
					break;
				case eventHandlers.keycodes.ENTER:
					eventHandlers.keys.enterDown = true;
					break;
				case eventHandlers.keycodes.SHIFT:
					eventHandlers.keys.shiftDown = true;
					break;
				case eventHandlers.keycodes.CTRL:
					eventHandlers.keys.ctrlDown = true;
					break;
				case eventHandlers.keycodes.ALT:
					eventHandlers.keys.altDown = true;
					break;
				case eventHandlers.keycodes.CAPS_LOCK:
					eventHandlers.keys.capsDown = true;
					break;
				case eventHandlers.keycodes.ESCAPE:
					eventHandlers.keys.escapeDown = true;
					break;
				case eventHandlers.keycodes.PAGE_UP:
					eventHandlers.keys.page_upDown = true;
					break;
				case eventHandlers.keycodes.PAGE_DOWN:
					eventHandlers.keys.page_downDown = true;
					break;
				case eventHandlers.keycodes.END:
					eventHandlers.keys.endDown = true;
					break;
				case eventHandlers.keycodes.HOME:
					eventHandlers.keys.homeDown = true;
					break;
				case eventHandlers.keycodes.LEFT_ARROW:
					eventHandlers.keys.left_arrowDown = true;
					break;
				case eventHandlers.keycodes.UP_ARROW:
					eventHandlers.keys.up_arrowDown = true;
					break;
				case eventHandlers.keycodes.RIGHT_ARROW:
					eventHandlers.keys.right_arrowDown = true;
					break;
				case eventHandlers.keycodes.DOWN_ARROW:
					eventHandlers.keys.down_arrowDown = true;
					break;
				case eventHandlers.keycodes.INSERT:
					eventHandlers.keys.insertDown = true;
					break;
				case eventHandlers.keycodes.DELETE:
					eventHandlers.keys.deleteDown = true;
					break;
				case eventHandlers.keycodes._0:
					eventHandlers.keys._0Down = true;
					break;
				case eventHandlers.keycodes._1:
					eventHandlers.keys._1Down = true;
					break;
				case eventHandlers.keycodes._2:
					eventHandlers.keys._2Down = true;
					break;
				case eventHandlers.keycodes._3:
					eventHandlers.keys._3Down = true;
					break;
				case eventHandlers.keycodes._4:
					eventHandlers.keys._4Down = true;
					break;
				case eventHandlers.keycodes._5:
					eventHandlers.keys._5Down = true;
					break;
				case eventHandlers.keycodes._6:
					eventHandlers.keys._6Down = true;
					break;
				case eventHandlers.keycodes._7:
					eventHandlers.keys._7Down = true;
					break;
				case eventHandlers.keycodes._8:
					eventHandlers.keys._8Down = true;
					break;
				case eventHandlers.keycodes._9:
					eventHandlers.keys._9Down = true;
					break;
				case eventHandlers.keycodes.A:
					eventHandlers.keys.aDown = true;
					break;
				case eventHandlers.keycodes.B:
					eventHandlers.keys.bDown = true;
					break;
				case eventHandlers.keycodes.C:
					eventHandlers.keys.cDown = true;
					break;
				case eventHandlers.keycodes.D:
					eventHandlers.keys.dDown = true;
					break;
				case eventHandlers.keycodes.E:
					eventHandlers.keys.eDown = true;
					break;
				case eventHandlers.keycodes.F:
					eventHandlers.keys.fDown = true;
					break;
				case eventHandlers.keycodes.G:
					eventHandlers.keys.gDown = true;
					break;
				case eventHandlers.keycodes.H:
					eventHandlers.keys.hDown = true;
					break;
				case eventHandlers.keycodes.I:
					eventHandlers.keys.iDown = true;
					break;
				case eventHandlers.keycodes.J:
					eventHandlers.keys.jDown = true;
					break;
				case eventHandlers.keycodes.K:
					eventHandlers.keys.kDown = true;
					break;
				case eventHandlers.keycodes.L:
					eventHandlers.keys.lDown = true;
					break;
				case eventHandlers.keycodes.M:
					eventHandlers.keys.mDown = true;
					break;
				case eventHandlers.keycodes.N:
					eventHandlers.keys.nDown = true;
					break;
				case eventHandlers.keycodes.O:
					eventHandlers.keys.oDown = true;
					break;
				case eventHandlers.keycodes.P:
					eventHandlers.keys.pDown = true;
					break;
				case eventHandlers.keycodes.Q:
					eventHandlers.keys.qDown = true;
					break;
				case eventHandlers.keycodes.R:
					eventHandlers.keys.rDown = true;
					break;
				case eventHandlers.keycodes.S:
					eventHandlers.keys.sDown = true;
					break;
				case eventHandlers.keycodes.T:
					eventHandlers.keys.tDown = true;
					break;
				case eventHandlers.keycodes.U:
					eventHandlers.keys.uDown = true;
					break;
				case eventHandlers.keycodes.V:
					eventHandlers.keys.vDown = true;
					break;
				case eventHandlers.keycodes.W:
					eventHandlers.keys.wDown = true;
					break;
				case eventHandlers.keycodes.X:
					eventHandlers.keys.xDown = true;
					break;
				case eventHandlers.keycodes.Y:
					eventHandlers.keys.yDown = true;
					break;
				case eventHandlers.keycodes.Z:
					eventHandlers.keys.zDown = true;
					break;
				default:
					//throw "Keycode not supported.";
					break;
			}
		};
		
		// Keyup event handler
		canvas.onkeyup = function(e) {
			switch(e.which) {
				case eventHandlers.keycodes.BACKSPACE: 
					eventHandlers.keys.backspaceDown = false;
					break;
				case eventHandlers.keycodes.TAB:
					eventHandlers.keys.tabDown = false;
					break;
				case eventHandlers.keycodes.ENTER:
					eventHandlers.keys.enterDown = false;
					break;
				case eventHandlers.keycodes.SHIFT:
					eventHandlers.keys.shiftDown = false;
					break;
				case eventHandlers.keycodes.CTRL:
					eventHandlers.keys.ctrlDown = false;
					break;
				case eventHandlers.keycodes.ALT:
					eventHandlers.keys.altDown = false;
					break;
				case eventHandlers.keycodes.CAPS_LOCK:
					eventHandlers.keys.capsDown = false;
					break;
				case eventHandlers.keycodes.ESCAPE:
					eventHandlers.keys.escapeDown = false;
					break;
				case eventHandlers.keycodes.PAGE_UP:
					eventHandlers.keys.page_upDown = false;
					break;
				case eventHandlers.keycodes.PAGE_DOWN:
					eventHandlers.keys.page_downDown = false;
					break;
				case eventHandlers.keycodes.END:
					eventHandlers.keys.endDown = false;
					break;
				case eventHandlers.keycodes.HOME:
					eventHandlers.keys.homeDown = false;
					break;
				case eventHandlers.keycodes.LEFT_ARROW:
					eventHandlers.keys.left_arrowDown = false;
					break;
				case eventHandlers.keycodes.UP_ARROW:
					eventHandlers.keys.up_arrowDown = false;
					break;
				case eventHandlers.keycodes.RIGHT_ARROW:
					eventHandlers.keys.right_arrowDown = false;
					break;
				case eventHandlers.keycodes.DOWN_ARROW:
					eventHandlers.keys.down_arrowDown = false;
					break;
				case eventHandlers.keycodes.INSERT:
					eventHandlers.keys.insertDown = false;
					break;
				case eventHandlers.keycodes.DELETE:
					eventHandlers.keys.deleteDown = false;
					break;
				case eventHandlers.keycodes._0:
					eventHandlers.keys._0Down = false;
					break;
				case eventHandlers.keycodes._1:
					eventHandlers.keys._1Down = false;
					break;
				case eventHandlers.keycodes._2:
					eventHandlers.keys._2Down = false;
					break;
				case eventHandlers.keycodes._3:
					eventHandlers.keys._3Down = false;
					break;
				case eventHandlers.keycodes._4:
					eventHandlers.keys._4Down = false;
					break;
				case eventHandlers.keycodes._5:
					eventHandlers.keys._5Down = false;
					break;
				case eventHandlers.keycodes._6:
					eventHandlers.keys._6Down = false;
					break;
				case eventHandlers.keycodes._7:
					eventHandlers.keys._7Down = false;
					break;
				case eventHandlers.keycodes._8:
					eventHandlers.keys._8Down = false;
					break;
				case eventHandlers.keycodes._9:
					eventHandlers.keys._9Down = false;
					break;
				case eventHandlers.keycodes.A:
					eventHandlers.keys.aDown = false;
					break;
				case eventHandlers.keycodes.B:
					eventHandlers.keys.bDown = false;
					break;
				case eventHandlers.keycodes.C:
					eventHandlers.keys.cDown = false;
					break;
				case eventHandlers.keycodes.D:
					eventHandlers.keys.dDown = false;
					break;
				case eventHandlers.keycodes.E:
					eventHandlers.keys.eDown = false;
					break;
				case eventHandlers.keycodes.F:
					eventHandlers.keys.fDown = false;
					break;
				case eventHandlers.keycodes.G:
					eventHandlers.keys.gDown = false;
					break;
				case eventHandlers.keycodes.H:
					eventHandlers.keys.hDown = false;
					break;
				case eventHandlers.keycodes.I:
					eventHandlers.keys.iDown = false;
					break;
				case eventHandlers.keycodes.J:
					eventHandlers.keys.jDown = false;
					break;
				case eventHandlers.keycodes.K:
					eventHandlers.keys.kDown = false;
					break;
				case eventHandlers.keycodes.L:
					eventHandlers.keys.lDown = false;
					break;
				case eventHandlers.keycodes.M:
					eventHandlers.keys.mDown = false;
					break;
				case eventHandlers.keycodes.N:
					eventHandlers.keys.nDown = false;
					break;
				case eventHandlers.keycodes.O:
					eventHandlers.keys.oDown = false;
					break;
				case eventHandlers.keycodes.P:
					eventHandlers.keys.pDown = false;
					break;
				case eventHandlers.keycodes.Q:
					eventHandlers.keys.qDown = false;
					break;
				case eventHandlers.keycodes.R:
					eventHandlers.keys.rDown = false;
					break;
				case eventHandlers.keycodes.S:
					eventHandlers.keys.sDown = false;
					break;
				case eventHandlers.keycodes.T:
					eventHandlers.keys.tDown = false;
					break;
				case eventHandlers.keycodes.U:
					eventHandlers.keys.uDown = false;
					break;
				case eventHandlers.keycodes.V:
					eventHandlers.keys.vDown = false;
					break;
				case eventHandlers.keycodes.W:
					eventHandlers.keys.wDown = false;
					break;
				case eventHandlers.keycodes.X:
					eventHandlers.keys.xDown = false;
					break;
				case eventHandlers.keycodes.Y:
					eventHandlers.keys.yDown = false;
					break;
				case eventHandlers.keycodes.Z:
					eventHandlers.keys.zDown = false;
					break;
				default:
					//throw "Keycode not supported.";
					break;
			}
		};
	},
	
	mouse: {
		x: 0, // x-position on the canvas
		y: 0, // y-position on the canvas
		leftDown: false,
		rightDown: false,
		middleDown: false
	},
	
	keys: {
		backspaceDown: false,
		tabDown: false,
		enterDown: false,
		shiftDown: false,
		ctrlDown: false,
		altDown: false,
		capsDown: false,
		escapeDown: false,
		page_upDown: false,
		page_downDown: false,
		endDown: false,
		homeDown: false,
		left_arrowDown: false,
		up_arrowDown: false,
		right_arrowDown: false,
		down_arrowDown: false,
		insertDown: false,
		deleteDown: false,
		_0Down: false,
		_1Down: false,
		_2Down: false,
		_3Down: false,
		_4Down: false,
		_5Down: false,
		_6Down: false,
		_7Down: false,
		_8Down: false,
		_9Down: false,
		aDown: false,
		bDown: false,
		cDown: false,
		dDown: false,
		eDown: false,
		fDown: false,
		gDown: false,
		hDown: false,
		iDown: false,
		jDown: false,
		kDown: false,
		lDown: false,
		mDown: false,
		nDown: false,
		oDown: false,
		pDown: false,
		qDown: false,
		rDown: false,
		sDown: false,
		tDown: false,
		uDown: false,
		vDown: false,
		wDown: false,
		xDown: false,
		yDown: false,
		zDown: false
	},
	
	// Javascript mousecodes
	mousecodes: {
		LEFT: 1,
		MIDDLE: 2,
		RIGHT: 3
	},
	
	// Subset of javascript keycodes
	keycodes: {
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
	}
};