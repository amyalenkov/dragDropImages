$(document).ready(function() {
    $('div[href^="#"]').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top}, 800);
        return false;
    });
//});
//$(document).ready(function() {
    $('.constructorFoto').click(function () {
        $('.leftConstructor2').css("background-image", "url(\"../assets/img/templates/"+$(this).attr('id')+".png\")");
        var id = $(this).attr('id').replace("template", "");
        $('#schema').css("background-image", "url(\"../assets/img/pillowCunstructor/schema"+id+".png\")");
        $('#descriptionFoto1').text($(this).find('#descriptionFoto11').text());
        $('#descriptionFoto2').text($(this).find('#descriptionFoto12').text());
        return false;
    });
});

$('#buttonUpload1').click(function () {
    $('#buttonUpload2').click();
    return false;
});