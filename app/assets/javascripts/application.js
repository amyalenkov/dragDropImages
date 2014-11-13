// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-fileupload/basic
//= require jquery-fileupload/vendor/tmpl
//= require jquery.ui.all
//= require jquery
//= require_tree .
//= require fabric
function Template(templateDefault, canvas){
    this.canvas = canvas;
    this.templateName = templateDefault;
    this.pushImageInTemplate = function(img){
        if(this.templateName == 'template1'){
            setTemplate1(img, this.canvas)
        }else if(this.templateName == 'template2'){

        }
    };
    function setTemplate1(img, canvas){
        img.setTop(canvas.height/2);
        img.setLeft(canvas.width/2);
        img.setScaleY(canvas.height/img.height);
        img.setScaleX(canvas.width/img.width);
    }
}
$(document).ready(function () {
    var canvas = new fabric.Canvas('canvas');
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
            setImageInTemplate(oImg)
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
        var allObjs = canvas.getObjects();
        var x = 0;
        var y = 0;
        for (var i = 0; i < allObjs.length; i++) {
            if (i != 4){
                drawTemplate(canvas,allObjs[i], HEIGHT/2, WIDTH/2, x, y);
            }
            if(i%2 == 0){
                x = x + HEIGHT/2;
            }else{
                x = 0;
                y = y + WIDTH/2;
            }
        }
    });

    $('#template2').click(function(){
        var allObjs = canvas.getObjects();
        var x = 0;
        var y = 0;
        for (var i = 0; i < allObjs.length; i++) {
            if (i != 2){
                drawTemplate(canvas,allObjs[i], HEIGHT/2, WIDTH, x, y);
            }
            if(i%2 == 0) {
                x = 0;
                y = y + WIDTH / 2;
            }
        }
    });

    $('#template3').click(function(){
        var allObjs = canvas.getObjects();
        var x = 0;
        var y = 0;
        for (var i = 0; i < allObjs.length; i++) {
            if (i != 2){
                drawTemplate(canvas,allObjs[i], HEIGHT, WIDTH/2, x, y);
            }
            if(i%2 == 0) {
                x = x + HEIGHT/2;
                y = 0;
            }
        }
    });

    $('#order').click(function(){
        canvas.deactivateAll().renderAll();
        canvasSrc = document.getElementById('canvas').toDataURL();
        $.ajax({
            url: 'payments/setSrcImage',
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
    var draggableOptions = {
        revert: true,
        start: function(e){
            console.log('start')
        },
        stop: function(e){
            console.log('stop '+ e.element.attr('class'));
            console.log('stop '+$(this).attr('class'))
        }
    };
    $(".dragImg").draggable(draggableOptions);
    $(".droppableImg").droppable({
        drop: function (event, ui) {
            var src = ui.draggable.context.src;
            var x = $(this).attr("x");
            var y = $(this).attr("y");
            var width = $(this).width();
            var height = $(this).height();
            var canvas = document.getElementById('canvas');
            drawImage(canvas, src, x, y, width,height);
            $(this).append( "<img width='100px' height='100px' scr='"+src+"'></img>" );
        }
    });
});
function drawImage(canvas, src, x, y, w, h) {
    var context = canvas.getContext('2d');
    context.save(); //as we now keep track outselves of angle/zoom due to
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(imageObj, x, y, w, h);
    };
    imageObj.src = src.replace(new RegExp("thumb_", "g"), "");

    context.restore();
}

function drawTemplate(canvas,image,height, width, x, y){
    image.setHeight(height);
    image.setWidth(width);
    canvas.calcOffset();
    canvas.renderAll();
    image.setTop(y+image.getHeight()/2);
    image.setLeft(x+image.getWidth()/2);
    canvas.calcOffset();
    canvas.renderAll();
}

function setImageInTemplate(img){
    img.setTop(canvas.height/2);
    img.setLeft(canvas.width/2);
    img.setScaleY(canvas.height/img.height);
    img.setScaleX(canvas.width/img.width);
}
