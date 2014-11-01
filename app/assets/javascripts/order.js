$(document).ready(function () {
    $("#count").click(function(){
        var number =  $(this).val();
        var oneCost = $('#cost').val();
        var finalCost =  (+number) * (+oneCost);
        $('#finalCost').val(finalCost);
    })
});