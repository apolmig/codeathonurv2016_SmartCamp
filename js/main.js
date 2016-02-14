// Global variables
var resiz; 
var canvas, stage, exportRoot;
var tickFunc = null;
var tickFuncs = new Array();
var pendingChanges = true, updateStopper = false;

// Sim configuratión
var fps = 20;

function tick(){
	if (tickFunc) {
		for (var f in tickFuncs) {
			if (tickFuncs[f]) {
				tickFuncs[f].func(tickFuncs[f].obj);
			}
		}
	}
	if (pendingChanges) {
		stage.update();
		if (updateStopper)
			pendingChanges = false;
	}
}

function addEnterFrame(o, f) {
	if (!tickFuncs[o.idf])
		tickFuncs[o.idf] = new Object();
	tickFuncs[o.idf].obj = o;
	tickFuncs[o.idf].func = f;
	tickFunc = haveTickFuncs();
}

function removeEnterFrame(idf) {
	delete tickFuncs[idf];
	tickFunc = haveTickFuncs();
}

// Función que nos dice si hay funciones de tick para ejecutar
function haveTickFuncs() {
	for (var f in tickFuncs) {
		if (tickFuncs[f])
			return true;
	}
	return false;
}

// Inicialitzación del ejercicio
function init(xmlDoc, mode, onEndInit) {
	
	canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	resiz = new SCResize('canvas');
	resiz.initSCResize();
	exportRoot = new lib.Delivery();

	stage.addChild(exportRoot);
	stage.update();
	stage.enableMouseOver(fps);

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", tick);
	
	// Adapt canvas to navigator window size
	resiz.reposition();
	if (onEndInit) onEndInit();
	//console.log("END MANIFEST");
}

