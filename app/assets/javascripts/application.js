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
//=require jquery-fileupload/basic
//= require jquery
//= require_tree .
//= require fabric
$(document).ready(function () {

    var canvas = new fabric.Canvas('canvas');
    function onObjectSelected(e) {
        var activeObject = canvas.getActiveObject();
        $('#opacity').val(activeObject.getOpacity())
        canvas.bringToFront(activeObject)
    }
    canvas.on('object:selected', onObjectSelected);
    $(".dragImg").click(function(){
//        var src = $(this).attr('id');
//        var imgElement = $("img[src='"+src+"']")[0];
//        fabric.Image.fromURL(src, function(oImg) {
//            oImg.setTop(100);
//            oImg.setLeft(100);
//            oImg.setWidth(100);
//            oImg.setHeight(100);
//            canvas.add(oImg);
//        });
        var imgInstance = new fabric.Image(this, {
            left: 100,
            top: 100,
            angle: 0,
            width: 100,
            height: 100
        });
        canvas.add(imgInstance);
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
    $('#sendEmail').click(function(){
        var emailValue = $('#email').val();
        var canvasSrc = document.getElementById('canvas').toDataURL();
        $.ajax({
            url: 'paintings/sendEmail',
            type: 'POST',
            data: {email: emailValue,
                    srcImage: canvasSrc}
        }).success(function(){
            alert('Email delivered success')
        }).error(function(){
            alert('Email not delivered. Check email and try again.');
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
    imageObj.src = src;

    context.restore();
}
