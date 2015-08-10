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
            oImg.set({top:5, left:5});

            var stylestemp = $('#'+canvasId).attr('style').split(';');
            var styles = {};
            var c = '';
            for (var x = 0, l = stylestemp.length; x < l; x++) {
                c = stylestemp[x].split(':');
                styles[$.trim(c[0])] = $.trim(c[1]);
            }
            var oldWidth = parseInt(styles.width.replace('px !important', ''));
            var oldHeight = parseInt(styles.height.replace('px !important', ''));

            var imgWidth = oImg.width;
            var imgHeight = oImg.height;

            console.log('size canvas: ');
            console.log(oldWidth);
            console.log(oldHeight);
            console.log('-------------');

            console.log('size image: ');
            console.log(oImg.width);
            console.log(oImg.height);
            console.log('-------------');

            var factorY = oldHeight/imgHeight;
            var factorX = oldWidth/imgWidth;

            console.log('factors: ');
            console.log(factorX);
            console.log(factorY);
            console.log('-------------');

            oImg.scaleX = 0.4;
            oImg.scaleY = 0.4;

            console.log('new size image: ');
            console.log(oImg.width);
            console.log(oImg.height);
            console.log('-------------');

            canvas.add(oImg);
        });
        canvas.renderAll();
        canvas.calcOffset();
        return false;
    }

}

