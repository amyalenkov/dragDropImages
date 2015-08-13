var images = null;
var canvases = [];
$(document).ready(function () {
    var canvasResult = new fabric.Canvas("canvas_result");
    addAllImages();
    addDropEventForManyCanvases();
    $('#order').click(function () {
//        createCanvasResult(canvasResult);
        createCanvasResultFromDivs(canvasResult);
    });
    $(".templates").click(function () {
        $.ajax({
            url: '/canvases/choice_canvas',
            type: 'POST',
            data: {
                template: $(this).attr('id')
            },
            success: function () {
                addDropEventForManyCanvases();
            }
        })
    });
});

function sendCanvasResultOnServer() {
    var canvasSrc = document.getElementById('canvas_result').toDataURL();
    $.ajax({
        url: '/payments/setSrcImage',
        type: 'POST',
        data: {
            srcImage: canvasSrc
        }
    })
}

function updateImageThumb(){
    console.log('updateImageThumb');
    var oldSrc = $('#image_thumb').attr('src')
    $('#image_thumb').attr('src', oldSrc+"?"+ new Date().getTime())
}

function createCanvasResult(canvasResult) {
    var canvases = document.getElementsByClassName('canvases');
    [].forEach.call(canvases, function (canvas) {
        var c_top = $(canvas).attr('c_top');
        var c_left = $(canvas).attr('c_left');
        var c_height = $(canvas).attr('c_height');
        var c_width = $(canvas).attr('c_width');
        var canvasSrc = canvas.toDataURL();
        var top = parseInt(canvasResult.height) * parseFloat(c_top);
        var left = parseInt(canvasResult.width) * parseFloat(c_left);
        var height = parseInt(canvasResult.height) * parseFloat(c_height);
        var width = parseInt(canvasResult.width) * parseFloat(c_width);
        fabric.Image.fromURL(canvasSrc, function (oImg) {
            oImg.setTop(top);
            oImg.setLeft(left);
            oImg.setWidth(width);
            oImg.setHeight(height);
            canvasResult.add(oImg);
            canvasResult.setActiveObject(oImg);
            canvasResult.calcOffset();
            canvasResult.renderAll();
            sendCanvasResultOnServer();
            updateImageThumb();
        });
    });
    canvasResult.calcOffset();
    canvasResult.renderAll();
}

function createCanvasResultFromDivs(canvasResult) {
    var divs = document.getElementsByClassName('div_for_canvas');
    [].forEach.call(divs, function (div) {
        var c_top = $(div).attr('c_top');
        var c_left = $(div).attr('c_left');
        var c_height = $(div).attr('c_height');
        var c_width = $(div).attr('c_width');
        var top = parseInt(canvasResult.height) * parseFloat(c_top);
        var left = parseInt(canvasResult.width) * parseFloat(c_left);
        var height = parseInt(canvasResult.height) * parseFloat(c_height);
        var width = parseInt(canvasResult.width) * parseFloat(c_width);
        var image = $(div).find('img')[0];

        fabric.Image.fromURL($(image).attr('src'), function (oImg) {
            var yFactor = height / oImg.height;
            oImg.setTop(top);
            console.log(top);
//            oImg.setLeft(left+($(image).offset() - $(div).parent().offset())*10);
            oImg.setLeft(left/2 + ($(image).offset().left - $(div).parent().offset().left)*10);
//            console.log(left);
//            console.log($(image).offset().left - $(div).parent().offset().left);
            oImg.setWidth(yFactor * oImg.width);
            oImg.setHeight(yFactor * oImg.height);
            canvasResult.add(oImg);
            canvasResult.setActiveObject(oImg);
            canvasResult.calcOffset();
            canvasResult.renderAll();
//            sendCanvasResultOnServer();
//            updateImageThumb();
        });
    });
    canvasResult.calcOffset();
    canvasResult.renderAll();
}

function addAllImages() {
    images = document.getElementsByClassName('dragImg');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
}

function addDropEventForManyCanvases() {
    var divs = document.getElementsByClassName('div_for_canvas');
    [].forEach.call(divs, function (div) {
        var currentCanvas = new Current_canvas(div.id);
        currentCanvas.currrentAddDropEventForCanvas();
        canvases.push(currentCanvas.current_canvas);
    })

}

function handleDragStart(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    this.classList.add('img_dragging');
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}


