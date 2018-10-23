$(document).ready(function () {

    $("#btn-registro").on('click', function (e) {
        e.preventDefault();
        var username = $('#nombreRegistro').val();
        var em = $('#emailRegistro').val();
        var pwd = $('#password').val();
        

        $.ajax({
            method: "POST",
            url:
                "http://www.miguelcamposrivera.com:3008/tictactoeapi/auth/signup",
            dataType: "json",
            data: { username: username ,email: em, password: pwd }
        })
            .done(function (user) {
                localStorage.setItem("token", user.token);
                localStorage.setItem("username", user.username);
                localStorage.setItem("email", user.email);


                location.replace('../../html/ranking.html');
            })
            .fail(function (resp) {
               $("#errorRegistro").removeClass('d-none');
                console.log("ERROR RESPUESTA");
                console.log(resp);
            });

    });

    
    

    
});