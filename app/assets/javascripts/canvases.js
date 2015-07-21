var images = null;
var canvases = [];
$(document).ready(function () {
    addAllImages();
    addDropEventForManyCanvases();
    $(".templates").click(function(){
        $.ajax({
            url: '/canvases/choice_canvas',
            type: 'POST',
            data: {
                template: $(this).attr('id')
            },
            success: function(){
                addDropEventForManyCanvases();
            }
        })
    });
    var canvasResult = new fabric.Canvas("canvas_result");
    $('#order').click(function(){
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
            fabric.Image.fromURL(canvasSrc, function(oImg) {
                oImg.setTop(top);
                oImg.setLeft(left);
                oImg.setWidth(width);
                oImg.setHeight(height);
                canvasResult.add(oImg);
            });
            canvasResult.calcOffset();
            canvasResult.renderAll();
        });
//        $('#myModal').modal('show');

//        $.ajax({
//            url: '/payments/setSrcImage',
//            type: 'POST',
//            data: {
//                srcImage: canvasSrc
//            },
//            success: function(data){
//            }
//        })
    });
});

function addAllImages(){
    images = document.getElementsByClassName('dragImg');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
}

function addDropEventForManyCanvases(){
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


