$(document).ready(function () {
    $("#count").click(function(){
        var number =  $(this).val();
        var oneCost = $('#oneCost').text();
        var finalCost =  (+number) * (+oneCost);
        $('#finalCost').text(finalCost);
    })
});