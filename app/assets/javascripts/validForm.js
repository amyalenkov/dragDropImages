$(document).ready(function() {
    $('#zakazZvonka').click(function() {
        document.getElementById("send_button").disabled = true
    });

    $("#validateName").keyup(function(){
        var name = $("#validateName").val();
        var phone = $("#validatePhone").val();
        if(name != 0){
            if(isValidName(name) && name.length > 1)
            {
                $("#validName").css({
                    "background-image": "url('../assets/img/ok.png')"
                });
                if(phone.length > 6){
                    document.getElementById("send_button").disabled = false;
                }
            }
            else{
                $("#validName").css({
                    "background-image": "url('../assets/img/error.png')"
                });
                document.getElementById("send_button").disabled = true;
            }

        } else {
            $("#validName").css({
                "background-image": "../assets/img/error.png"
            });
            document.getElementById("send_button").disabled = true;
        }
    });

    $("#validateName").focusin(function(){
        var name = $("#validateName").val();
        var phone = $("#validatePhone").val();
        if(name > 1){
            $("#validName").css({
                "background-image": "url('../assets/img/ok.png')"
            });
            if(phone.length > 6){
                document.getElementById("send_button").disabled = false;
            }
            else{
                document.getElementById("send_button").disabled = true;
            }
        }
        else{
            $("#validName").css({
                "background-image": "url('../assets/img/error.png')"
            });
            document.getElementById("send_button").disabled = true;
        }
    });

    $("#validatePhone").keyup(function(){
        var phone = $("#validatePhone").val();
        var name = $("#validateName").val();
        if(phone != 0)
        {
            if(isValidPhone(phone) && phone.length > 6)
            {
                $("#validPhone").css({
                    "background-image": "url('../assets/img/ok.png')"
                });
                if(name > 1){
                    document.getElementById("send_button").disabled = false;
                }
                else{
                    document.getElementById("send_button").disabled = true;
                }
            } else {
                $("#validPhone").css({
                    "background-image": "url('../assets/img/error.png')"
                });
                document.getElementById("send_button").disabled = true;
            }
        } else {
            $("#validPhone").css({
                "background-image": "../assets/img/error.png"
            });
            document.getElementById("send_button").disabled = true;
        }
    });

    $("#validatePhone").focusin(function(){
        var name = $("#validateName").val();
        var phone = $("#validatePhone").val();
        if(isValidPhone(phone) && phone.length > 6){
            $("#validPhone").css({
                "background-image": "url('../assets/img/ok.png')"
            });
            if(name > 1){
                document.getElementById("send_button").disabled = false;
            }
            else{
                document.getElementById("send_button").disabled = true;
            }
        }
        else{
            $("#validPhone").css({
                "background-image": "url('../assets/img/error.png')"
            });
            document.getElementById("send_button").disabled = true;
        }
    });

});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function isValidName(name) {
    var pattern = new RegExp(/\W+|\w+/i);
    return pattern.test(name);
}

function isValidPhone(phone) {
    var pattern = new RegExp(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i);
    return pattern.test(phone);
}