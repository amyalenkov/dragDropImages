$(document).ready(function () {
    var amount_for_one = 300;
    $('#minus_count').click(function () {
        var col = parseInt($('#col').text());
        var newCol=0;
        if(col != 1){
            newCol = col - 1;
            $('#col').text(newCol);
            $('#count').val(newCol);
            $('#result').text(amount_for_one * newCol);
            $('#money').val(amount_for_one * newCol +'000');
        }
        return false;
    });
    $('#plus_count').click(function () {
        var col = parseInt($('#col').text());
        var newCol = col + 1;
        $('#col').text(newCol);
        $('#count').val(newCol);
        $('#result').text(amount_for_one * newCol);
        $('#money').val(amount_for_one * newCol +'000');
        return false;
    });
});