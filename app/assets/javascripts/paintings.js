/**
 * Created by amyalenkov on 4/3/15.
 */
var canvas = null;
var images = null;
var currentTemplate = null;

$(document).ready(function () {
    canvas = new fabric.Canvas('canvas');
    currentTemplate = new Template('template1',canvas);
    addAllImages();
    var canvasSrc = canvas.toDataURL();
    function onObjectSelected(e) {
        var activeObject = canvas.getActiveObject();
        $('#opacity').val(activeObject.getOpacity())
        canvas.bringToFront(activeObject)
    }
    canvas.on('object:selected', onObjectSelected);
    $('body').on('click','.dragImg',function(){
        var srcImg = this.src.replace(new RegExp("thumb_", "g"), "");
        fabric.Image.fromURL(srcImg, function(oImg) {
            currentTemplate.pushImageInTemplate(oImg);
            canvas.add(oImg);
        });
        canvas.calcOffset();
        canvas.renderAll();
    });
    $('#opacity').on('change', function(){
        var activeObject = canvas.getActiveObject();
        if(canvas.getActiveObject() == null){
            alert('Select any image')
        }
        else{
            activeObject.setOpacity($(this).val());
            canvas.renderAll();
        }
    });
    $('#deleteImage').click(function(){
        var activeObject = canvas.getActiveObject();
        if(canvas.getActiveObject() == null){
            alert('Select any image')
        }
        else{
            canvas.remove(activeObject);
        }
    });
    $('#template1').click(function(){
        deleteAllImages();
        currentTemplate.templateName = 'template1';
    });

    $('#template2').click(function(){
        deleteAllImages();
        currentTemplate.templateName = 'template2';
    });

    $('#template3').click(function(){
        deleteAllImages();
        currentTemplate.templateName = 'template3';
    });

    $('#template4').click(function(){
        deleteAllImages();
        currentTemplate.templateName = 'template4';
    });

    $('#template5').click(function(){
        deleteAllImages();
        currentTemplate.templateName = 'template5';
    });

    $('#template6').click(function(){
        deleteAllImages();
        currentTemplate.templateName = 'template6';
    });

    $('#template7').click(function(){
        deleteAllImages();
        currentTemplate.templateName = 'template7';
    });
    $('#template8').click(function(){
        deleteAllImages();
        currentTemplate.templateName = 'template8';
    });

    $('#order').click(function(){
        canvas.deactivateAll().renderAll();
        canvasSrc = document.getElementById('canvas').toDataURL();
        $.ajax({
            url: '/payments/setSrcImage',
            type: 'POST',
            data: {
                srcImage: canvasSrc
            },
            success: function(data){
                console.log('success')
                $('.button_to').submit();
            },
            error: function(){
                console.log('error' )
            }
        })
    });
});

function addAllImages(){
    images = document.getElementsByClassName('dragImg');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
    var canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);
}

function deleteAllImages(){
    var allObjs = canvas.getObjects();
    for (var i = 0; i < allObjs.length; i++) {
        canvas.remove(allObjs[0]);
    }
}

function handleDragStart(e) {
    console.log('drag start');
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    this.classList.add('img_dragging');
}

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

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }
    if(e.preventDefault) { e.preventDefault(); }

    var img = document.getElementsByClassName('img_dragging')[0];
    var srcImg = img.src.replace(new RegExp("thumb_", "g"), "");
    fabric.Image.fromURL(srcImg, function(oImg) {
        currentTemplate.pushImageInTemplate(oImg, e.layerX, e.layerY);
        canvas.add(oImg);
    });
    canvas.calcOffset();
    canvas.renderAll();
    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}



