/**
 * Created by amyalenkov on 6/25/15.
 */
function Current_canvas(div_id){
    var canvasId = 'canvas_'+div_id;
    var canvas = new fabric.Canvas(canvasId);
    this.current_canvas = canvas;

    this.currrentAddDropEventForCanvas = function addDropEventForCanvas(){
        var canvasContainer = document.getElementById(div_id);
        canvasContainer.addEventListener('dragenter', handleDragEnter, false);
        canvasContainer.addEventListener('dragover', handleDragOver, false);
        canvasContainer.addEventListener('dragleave', handleDragLeave, false);
        canvasContainer.addEventListener('drop', this.currentHandleDrop, false);
    };

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
        // NOTE: comment above refers to the article (see top) -natchiketa

        return false;
    }

    function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over'); // this / e.target is previous target element.
    }

    this.currentHandleDrop = function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
        if(e.preventDefault) { e.preventDefault(); }

        var img = document.getElementsByClassName('img_dragging')[0];
        var srcImg = img.src.replace(new RegExp("thumb_", "g"), "");
        fabric.Image.fromURL(srcImg, function(oImg) {
//        currentTemplate.pushImageInTemplate(oImg, e.layerX, e.layerY);
            canvas.add(oImg);
        });
        canvas.calcOffset();
        canvas.renderAll();
        return false;
    }

}

