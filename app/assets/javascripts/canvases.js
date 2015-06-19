$(document).ready(function () {
    $(".templates").click(function(){
        $.ajax({
            url: '/canvases/choice_canvas',
            type: 'POST',
            data: {
                template: $(this).attr('id')
            }
        })
    })
});