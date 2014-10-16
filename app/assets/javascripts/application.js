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
$(document).ready(function () {
    $(".template_div").hide()
    $("#div_template1").show()

    var draggableOptions = {
        revert: true
    }
    countImg = 0
    $(".dragImg").draggable(draggableOptions);
    $(".droppableImg").droppable({
        drop: function (event, ui) {
            var src = ui.draggable.context.src
            var width = $(this).width()
            var height = $(this).height()
            var img = "'<img alt='Images' id='img_"+countImg+"' style='cursor: move; display: inline-block;overflow: hidden '" +
            " src='" + src + "' width='" + width + "' height='" + height + "' >'"
            countImg++;
//            $(this).append(img)
//            var canvas = $(this).children('canvas')[0];
            var y = $(this).css("margin-top").replace("px", "");
            var x = $(this).css("margin-left").replace("px", "");
            console.log('x '+x)
            console.log('y '+y)
            var canvas = document.getElementById('111');
//            var imageObj = new Image();
//            imageObj.onload = function() {
//                context.drawImage(imageObj, 0, 0, width,height);
//            };
//            imageObj.src = src
            var yy = parseInt(400) + parseInt(y) - parseInt(x);
            var xx = parseInt(x)
            console.log('yy '+yy)
            console.log('xx '+xx)

            drawImage(canvas, src, 200,200, width,height)
        }
    });
    $(".templates_buttons").button()
        .click(function (event) {
            var id = "#div_"+ this.id
            $(".template_div").hide()
            $(id).show()
        });

});
var zoom = 50;
function zoom_in(){
    var canvas = document.getElementById('111');
    var context = canvas.getContext('2d');
    context.scale(2,2)
    i = i;
    hw = hw
    console.log('zoom in ' + i)
    console.log('zoom in ' + hw)
    console.log('zoom in ' + canvas.height)
    w = canvas.width + hw;
    h = canvas.height + hw;
    drawImage(canvas,canvas.toDataURL(),i, i,w ,h )
}

var zoomDelta = 0.5;
var currentScale = 1;
var i = 1;
var hw = 0;
function zoom_out(){
    var canvas = document.getElementById('111');
    var context = canvas.getContext('2d');

    i = i;
    hw = hw
    context.scale(1,1)

    console.log('zoom out ' + i)
    console.log('zoom out ' + canvas.width)
    w = canvas.width + hw;
    h = canvas.height + hw;
    drawImage(canvas,canvas.toDataURL(),i, i,w ,h )
}

function delete_img(){
    console.log('delete_img')
    var canvas = document.getElementById('111');
    var context = canvas.getContext('2d');
    clear(context, canvas)
}

function clear(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}


function drawImage(canvas, src, x, y, w, h) {
    var context = canvas.getContext('2d');
    clear(context,canvas);
    context.save(); //as we now keep track outselves of angle/zoom due to
    //translation, we can use save/restore
//    console.log(currentScale)
//    context.scale(currentScale, currentScale);
//    context.rotate(currentAngle * Math.PI / 180);
//    context.drawImage(image, -image.width / 2, -image.width / 2);
//
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(imageObj, x, y, w, h);
    };
    imageObj.src = src

    context.restore();
}

var startX, startY, isDown = false;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
canvas = document.getElementById('111');
canvas.onmousedown = function (e) {
    var pos = getMousePos(canvas, e);
    startX = pos.x;  //store current position
    startY = pos.y;
    console.log('ddd')
    isDown = true;   //mark that we are in move operation
}

canvas.onmousemove = function (e) {
    if (isDown === true) {
        var pos = getMousePos(canvas, e);
        var x = pos.x;
        var y = pos.y;
        var context = canvas.getContext('2d');

        //translate difference from now and start
        context.translate(x - startX, y - startY);
        drawImage(canvas,canvas.toDataURL(),0,0,375,175);

        //update start positions for next loop
        startX = x;
        startY = y;
    }
}

//reset move operation status
canvas.onmouseup = function (e) {
    isDown = false;
}