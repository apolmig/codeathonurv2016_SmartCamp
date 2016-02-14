var resiz;
var canvas;
function sc_initialize() {
	
	resiz = new SCResize('canvas');
	resiz.initSCResize();
	
	// Bubbles menú js initialization
	var button = document.querySelector('.trigger'),
		items = document.querySelectorAll('li');
	var openCloseMenu = function() {
	  for(i=0; i < items.length; i++){
		items[i].classList.toggle('slideout');
	  }
	}
	button.onclick = openCloseMenu;
	
	// cross browser support for the requestAnimationFrame method
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (function() {
		return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();
	}
	
	PDFJS.disableStream = true;
	//PDFJS.workerSrc = 'smartcamp/js/pdf.worker.js';
	
	goToOption(0);
	listFiles();
	
	$('.icon-search').click(function () {
		goToOption(0);
		listFiles();
	});
	$('.icon-upload').click(function () {
		$("#sc_background").css({"opacity" : "0.7"})
		$("#sc_background").css({"display" : "block"})
		$("#sc_large").fadeIn("slow");
	});
	
	
	// Eventos de cerrado del Popup
	$(document).keydown(function(event) {  //keypress did not work with ESC;
		if ($("#sc_large").css('visibility') == 'visible') {
			if (event.which) {
				if (event.which == '27') {
					$("#sc_background").fadeOut("slow");
					$("#sc_large").fadeOut("slow");
				}
			}
			else if (window.event.which){
				if(window.event.which == 27){
					$("#sc_background").fadeOut("slow");
					$("#sc_large").fadeOut("slow");
				}
			}
		}
	});

	$("#sc_background").click(function(){
	    $("#sc_background").fadeOut("slow");
	    $("#sc_large").fadeOut("slow");
	});

	$("#sc_popup_close").click(function(){
	    $("#sc_background").fadeOut("slow");
	    $("#sc_large").fadeOut("slow");
	});
	
}

// Datos de test (se cargaría de la BD)
var lfildata = [{
		id : "1",
		file_name : "Bases_URV_Codeathon_2016.pdf",
		desc : 'Bases Codeathon URV 2016',
		type : 'pdf'
	}, {
		id : "2",
		file_name : "warriors_full_1227_512kb.mp4",
		desc : 'Warriors of the Net',
		type : 'video'
	}];
var ltagdata = [{
		id : "1",
		pos : { x: 200, y: 300 },
		page: 1,
		text : 'Gran competición!',
		res: "1"
	}, {
		id : "1",
		pos : { x: 10, y: 10 },
		page: 1,
		text : 'El año que viene reptimos :)',
		res: "1"
	}, {
		id : "2",
		pos : { x: 100, y: 50 },
		page: 1,
		text : 'Estos de think it tienen una geta ...',
		res: "1"
	}];
function listFiles() {
	$('#lfil').html("");
	$('#lfil').append("<div class='sc_title'>Files</div>");
	$('#lfil').css('display', 'block');
	for (var i = 0; i < lfildata.length; i++) {
		$('#lfil').append('<div class="lfil_item" id="'+lfildata[i].id+'"><div class="ltext">'+lfildata[i].desc+'</div></div>');
	}
	setTimeout(function () {
		$('.lfil_item').click(onListItemClick);
	}, 1);
}
function onListItemClick(e) {
	var id = e.target.id;
	if (!id) id = $(e.target).parent().attr("id");
	if (!id) return;
	var file = null;
	for (var i = 0; i < lfildata.length; i++)
		if (lfildata[i].id == id) file = lfildata[i];
	if (!file) return;
	showResource(file.file_name, file.type, file.id);
}
var sel_id;
function showResource(file_name, type, id) {
	goToOption(1);
	PDFJS.getDocument('/smartcamp/upload/docs/' + file_name).then(function(pdfFile) {
		// The PDF file stored in the `pdf` variable
		var pageNumber = 1;
		sel_id = id;
		renderPage(pdfFile, pageNumber);
	});
}
function renderPage(pdfFile, pageNumber) {
	pdfFile.getPage(pageNumber).then(function(page) {
		var scale = 1;
		var viewport = page.getViewport(scale);
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');

  		var renderContext = {
			canvasContext: context,
			viewport: viewport
		};

		page.render(renderContext);
		
		canvas.height = viewport.height * scale;
		canvas.width = viewport.width * scale;
		
		for (var i = 0; i < ltagdata.length; i++) {
			console.log(i, sel_id, ltagdata[i], pageNumber);
			if (ltagdata[i].id == sel_id && pageNumber == ltagdata[i].page) {
				console.log("si!");
				var $tag = $('<div class="sc_tag" >'+ltagdata[i].text+'</div>');
				$('#ccontainer').append($tag);
				$tag.css('top' , ltagdata[i].pos.y + 'px');
				$tag.css('left' , ltagdata[i].pos.x + 'px');
			}
		}
	});
}
var zoomed = false;
var openPage = function(pdfFile, pageNumber) {
    pdfFile.getPage(pageNumber).then(function(page) {
        viewport = page.getViewport(1);

        if (zoomed) {
            var scale = pageElement.clientWidth / viewport.width;
            viewport = page.getViewport(scale);
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        page.render(renderContext);
    });
};
var currPageNumber = 1;

var openNextPage = function() {
    var pageNumber = Math.min(pdfFile.numPages, currPageNumber + 1);
    if (pageNumber !== currPageNumber) {
        currPageNumber = pageNumber;
        openPage(pdfFile, currPageNumber);
    }
};

var openPrevPage = function() {
    var pageNumber = Math.max(1, currPageNumber - 1);
    if (pageNumber !== currPageNumber) {
        currPageNumber = pageNumber;
        openPage(pdfFile, currPageNumber);
    }
};
function showTag(tag) {
}
// Navigate
function goToOption(opt) {
	$('#lfil').css('display', 'none');
	$('#sc_visualizer').css('display', 'none');
	switch(opt) {
		case 0:
			$('#lfil').css('display', 'block');
			break;
		case 1:
			$('#sc_visualizer').css('display', 'block');
			break;
	}
	page_render();
}
function page_render() {
}
