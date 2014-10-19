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
    $(".clear_div").hide()
    $(".template_div").hide()
    $("#div_template1").show()

    var draggableOptions = {
        revert: true
    }
    $('#ajaxBusy').hide();
    $('#sendEmail').click(function(){
        $('#ajaxBusy').show();
        var emailValue = $('#email').val()
        var canvasSrc = document.getElementById('canvas').toDataURL();
        $.ajax({
            url: 'paintings/sendEmail',
            type: 'POST',
            data: {email: emailValue,
                    srcImage: canvasSrc}
        }).success(function(){
            $('#ajaxBusy').hide();
            alert('Email delivered success')
        }).error(function(){
            alert('Email not delivered. Check email and try again.')
            $('#ajaxBusy').hide();
        })
    })
    $(".dragImg").draggable(draggableOptions);
    $(".droppableImg").droppable({
        drop: function (event, ui) {
            var src = ui.draggable.context.src
            var x = $(this).attr("x")
            var y = $(this).attr("y")
            var width = $(this).width()
            var height = $(this).height()
            var canvas = document.getElementById('canvas');
            drawImage(canvas, src, x, y, width,height)
        }
    });
    $(".templates_buttons").button()
        .click(function (event) {
            var id = "#div_"+ this.id
            $(".template_div").hide()
            $(id).show()
        });
    $('.clear_div').click(function(){
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var x = $(this).parent().attr('x')
        var y = $(this).parent().attr('y')
        var h = $(this).parent().height()
        var w = $(this).parent().width()
        clear(context, canvas, x, y, w, h)
    })
    $('.droppableImg').mouseover(function(){
        console.log($(this).attr('x') +"-"+ $(this).attr('y') + ' enter')
        $(this).children().show();
    })
    $('.droppableImg').mouseleave(function(){
        console.log($(this).attr('x') +"-"+ $(this).attr('y') + ' leave')
        $(this).children().hide();
    })
});

function delete_img(){
    console.log('delete_img')
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    clear(context, canvas, 0, 0, canvas.width, canvas.height)
}

function clear(context, canvas, x, y, w, h) {
    context.clearRect(x, y, w, h);
}


function drawImage(canvas, src, x, y, w, h) {
    var context = canvas.getContext('2d');
    context.save(); //as we now keep track outselves of angle/zoom due to
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(imageObj, x, y, w, h);
    };
    imageObj.src = src

    context.restore();
}
