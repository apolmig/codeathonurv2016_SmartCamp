//------------------------------------------------------------------------------
// archivo: xresize.js
//
// Clase XResize: Clase que controla el scalado y centrado del contenido
//
// Autor: Javier GarcÃ©s - Sinergia sistemas informÃ¡ticos
// Autor: JesÃºs GironÃ©s - Sinergia sistemas informÃ¡ticos
//
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// DEFINICIÓN DE LA CLASE
// 
// Parámetros:
//	- containerNameId: elemento DOM (Canvas) donde se incrusta el simulador
//------------------------------------------------------------------------------

function SCResize(containerNameId /*String*/, debug /*Boolean*/)
{

	//---------------------
	// Constantes
	//---------------------

	this.R_WIDTH = 1024;
	this.R_HEIGHT = 768;
	
	//---------------------
	// Variables generales
	//---------------------

	this._initialized = false;
	this._debug = debug || false;
	
	this.containerNameId = containerNameId;
	this.w;
	this.h;
	this.scale;
	
	this.resize_command;
	
	/******************************************************************************
	 * Rutinas de inicialización
	 ******************************************************************************/

	// En esta función se irán poniendo requisitos generales para la aplicaciÃ³n
	this.initJQuery = function() {
		// Testear IE en jQuery 2.0 o 1.9+ (la propiedad jQuery.browser.msie en versiones previas a 1.9 no existe)
		var term;
		var ua = navigator.userAgent.toLowerCase();
		jQuery.browser = new Object();
		jQuery.browser.msie = /msie|trident/.test(ua);
		term = ua.match(/(msie|trident)\s*(?:\/\s*)?(.[^;]*)/);
		if (term) {
			jQuery.browser.engine = $.trim(term[1]);
			jQuery.browser.version = parseFloat($.trim(term[2]));
		} else {
			jQuery.browser.engine = "";
			jQuery.browser.version = -1.0;
		}
		//alert(ua+"\n"+term+"\n"+jQuery.browser.engine+" "+jQuery.browser.version);
		//alert(jQuery.browser.version);
	};
	
	this.initSCResize = function()
	{
		var refThis = this;
		
		this.initJQuery();
		
		if (refThis._initialized == true) return;
		
		this.scale = 1;
		//stage.scaleX = 1;
		//stage.scaleY = 1;
		this._needPatch = false;
		this._isIOS = false;
		this._isNativeBrowser = false;
		this._actionsReady = false;
		this._initialized = true;
		refThis.onDOMContentLoaded(refThis);
	};
	
	/******************************************************************************
	 * Ejecución al cargar la página :
	 ******************************************************************************/
	this.onDOMContentLoaded = function(self) {
		
		var refThis = self;
		
		// Mirem les coses de sistema
		// Es guardem si Ã©s iOS
		var nua = navigator.userAgent;
		refThis._isIOS = (/iPhone|iPad|iPod/i.test(nua));
		refThis._isNativeBrowser = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
		
		// Comprovem si hem de fer el patch del contenidor que ens han passat
		if (refThis.needContainerSizePatch()) {
			//alert("NEED PATCH!!!");
			refThis._needPatch = true;
		}
		
		if (refThis._isIOS) {
			document.body.addEventListener("touchmove", function(e) {
				e.preventDefault(); 
			});
		}
		// Registrem el onResize de window per ajustar-nos quan canvia la mida de la finestra
		//window.onresize = refThis.reposition;
		if (window.attachEvent) {
		    window.attachEvent('onresize', function() {
		    	refThis.onResizeEvent();
		    });
		}
		else if(window.addEventListener) {
			window.addEventListener('resize', function() {
		    	refThis.onResizeEvent();
			}, true);
		}
		
	};
	
	this.styleToObject = function(style) {
		var parts = style.split(";");
		var i;
		var res = new Object();
		for (i=0;i<parts.length;i++) {
			var attr = parts[i].trim();
			if (attr == "")
				continue;
			var attrParts = parts[i].split(":");
			res[attrParts[0].toLowerCase().trim()] = attrParts[1].toLowerCase().trim();
		}
		return res;
	};
	
	// rutina per comprovar si s'ha d'ajustar la divisió pare perquè la mida
	// està  en percentatges
	this.needContainerSizePatch = function () {
		var refThis = this;
		var $container = $("#topcontainer");
		// Mirem si depén del body
		if($container.parent().is('body') == false)
			return false;
		// Mirem si les mides estan en %
		var style = $container.attr("style");
		if (style) {
			var objStyle = refThis.styleToObject(style);
			if (objStyle["height"] == "100%")
				return true;
		}
		return false;
		/*
		var height = $(refThis._diapContainer).css("height");
		alert('need patch height: ' + height + " / " + heightAttr);
		if (height == "0px")
			return true;
		return false;
		*/
	};
	
	// Rutina para el evento de resize
	this.onResizeEvent = function() {
		var refThis = this;
		if (refThis._isIOS) {
			// En iOS debemos esperar un poquito para obtener la orientaciÃ³n correcta
			setTimeout(function () {
				refThis.reposition();
			}, 500); // 500ms es lo mÃ­nimo que puedo usar...
		} else {
				refThis.reposition();
		}
	};
	
	/******************************************************************************
	 * Rutinas para cáculo del reposicionamiento
	 ******************************************************************************/
	 
	// Rutina para paosicionar correctamente la parte visual del diaporama
	// manteniendo la relaciÃ³n de aspecto.
	this.reposition = function() {
		
		var refThis = this;
		
		var $ccanvas = $(document.getElementById("canvas"));
		var container = document.getElementById("ccontainer");
		var $container = $(container);
		var parentContainer = document.getElementById("topcontainer");
		var $parentContainer = $(parentContainer);
		var parentWidth = $parentContainer.width();
		var parentHeight = $parentContainer.height();

		// Si necessitem patch, anem per feina...
		if (refThis._needPatch) {
			var patchSize = refThis.patchContainerSize();
			parentHeight = patchSize.y;
			if (refThis._isIOS)
				parentWidth = patchSize.x;
		}

		// Cálculo del cambio en la escala
		if (refThis.w != parentWidth || refThis.h != parentHeight) {

			$ccanvas.css("visibility", "hidden");
			var iWidth = $container.width();
			var iHeight = $container.height();
			var newWidth;
			var newHeight;

			var newDimensions = refThis.getScaledDimensions(parentWidth, parentHeight, container);
			newWidth = newDimensions.x;
			newHeight = newDimensions.y;

			//console.log("B",parentWidth, parentHeight, newDimensions.x, newDimensions.y);
			var newWidthScale = newWidth / iWidth;
			var newHeightScale = newHeight / iHeight;
			$container.css("-ms-transform-origin", "0 0");
			$container.css("-ms-transform-origin-x", "0px");
			$container.css("-ms-transform-origin-y", "0px");
			$container.css("-webkit-transform-origin-x", "0px");
			$container.css("-webkit-transform-origin-y", "0px");
			$container.css("-moz-transform-origin-x", "0px");
			$container.css("-moz-transform-origin-y", "0px");
			$container.css("-o-transform-origin-x", "0px");
			$container.css("-o-transform-origin-y", "0px");
			$container.css("transform-origin-x", "0px");
			$container.css("transform-origin-y", "0px");
			$container.css("transform-origin", "0 0");
			//$htmlMCCont.css("zoom", newWidthScale); // Old IE
			/* Sistema de escalado antiguo por CSS que el resultado en pantalla es borroso
			$htmlMCCont.css("-ms-transform", "scale("+newWidthScale+","+newHeightScale+")");
			$htmlMCCont.css("-moz-transform", "scale("+newWidthScale+","+newHeightScale+")");
			$htmlMCCont.css("-o-transform", "scale("+newWidthScale+","+newHeightScale+")");
			$htmlMCCont.css("-webkit-transform", "scale("+newWidthScale+","+newHeightScale+")");
			$htmlMCCont.css("transform", "scale("+newWidthScale+","+newHeightScale+")");*/
			// El escalado por CSS transform mantiene el margen incial, hay que calcularlo para
			// que la diapositiva quede en el centro del contenedor
			$container.css("margin-left", (parentWidth/2 - (iWidth * newWidthScale)/2) + "px");
			$container.css("top", (parentHeight/2 - (iHeight * newHeightScale)/2) + "px");
			// Actualizar las dimensiones del canvas para que no haya efecto blurry
			refThis.scale = newWidthScale;
			//stage.scaleX = newWidthScale;
			//stage.scaleY = newHeightScale;
			//canvas.width = newWidth;
			//canvas.height = newHeight;
			refThis.w = parentWidth;
			refThis.h = parentHeight;
			$ccanvas.css("visibility", "visible");
			if (refThis.resize_command)
				refThis.resize_command();
		}
		
		//stage.update();
	};
	
	this.getScaledDimensions = function(parentWidth, parentHeight, diapElem) {
		
		// Ajustem la mida
		var img = diapElem;

		// Mirem la mida de content i la de img i deduim si hi cap la imatge
		var conW = parentWidth;
		var conH = parentHeight;
		var imgW = img.offsetWidth;
		var imgH = img.offsetHeight;
		
		var result = { x: 0, y: 0 };

		// Calculem mides amb model Letterbox
		// Si el contenidor és més horitzontal que el contingut -> mana el height
		if (conW/conH > imgW/imgH) {
			result.y = conH;
			result.x = imgW * (conH/imgH);
		} else { // Si en canvi el contenidor Ã©s mÃ©s vertical que el contigut -> mana el width
			result.x = conW;
			result.y = imgH * (conW/imgW);
		}
		return result;
	};
	
	this.patchContainerSize = function () {
		//alert('Patch');
		
		// Obtenim la mida de l'alçada de la finestra
		var totalWidth = window.innerWidth ? window.innerWidth : $(window).width();
		var totalHeight = window.innerHeight ? window.innerHeight : $(window).height();
		var orient = "none";
		
		// Atención Patch para iPAD (bug Safari iOS)
		// En el caso de iOS, hay un bug: cuando el diapo está dentro de un iFrame, las medidas
		// que retorna el navegador no se corresponden con las medidas reales disponibles, sinó 
		// con un "área virtual" mayor. Solo en modo vertical. Esto provoca que en vertical no
		// quepa. Por ello, si estamos en iOS y en vertical, nos aseguramos de que la anchura
		// NUNCA pase de los 768 pÃ­xels reales que tiene el dispositivo
		
		if (this._isIOS) {
			// Buscamos la ventana principal en la que estamos, que es la Ãºnica que tiene
			// el valor de orientaciÃ³n correcto
			var w = window;
			while (w.parent != null && w.parent != w) {
				w = w.parent;
			}
			// Miramos si estamos en vertical (orientación 0 o 180 grados)
			if (w.orientation == 0 || w.orientation == 180) {
				// Limitamos la anchura a los 768 pÃ­xels
				if (totalWidth > 768)
					totalWidth = 768;
				orient = "v:" + w.orientation;
			} else {
				orient = "h: "+ w.orientation;
			}
		}
		
		//alert("PATCH WIDTH: " + totalWidth + " - HEIGHT: " + totalHeight + " ORIENTATION: " + orient);
		return { x: totalWidth, y: totalHeight };
	};
	
}
