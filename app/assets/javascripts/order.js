$(document).ready(function () {
    $("#count").click(function(){
        var number =  $(this).val();
        var oneCost = $('#cost').val();
        var finalCost =  (+number) * (+oneCost);
        $('#finalCost').val(finalCost);
    })
    $('#plus_count').click(function(){
        var oldNumber =  $("#count").val();
        var newNumber = 1 + (+oldNumber);
        var oneCost = $('#cost').val();
        var finalCost =  (+newNumber) * (+oneCost);
        $('#finalCost').val(finalCost);
        $('#count').val(newNumber);
    });
    $('#minus_count').click(function(){
        var oldNumber =  $("#count").val();
        if (oldNumber != 1){
            var newNumber = (+oldNumber) - 1;
            var oneCost = $('#cost').val();
            var finalCost =  (+newNumber) * (+oneCost);
            $('#finalCost').val(finalCost);
            $('#count').val(newNumber);
        }
    });
});