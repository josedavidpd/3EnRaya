$(document).ready(function (){

        var token = localStorage.getItem('token');
        var username = localStorage.getItem('username');


    $.ajax({
        method: "GET",
        url:
            "http://www.miguelcamposrivera.com:3008/tictactoeapi/user/ranking",
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
    })
        .done(function (user) {
           $('.nombreUsuario').html(username);
           
        })
        .fail(function (resp) {
            console.log("ERROR RESPUESTA");
            console.log(resp);
        });

});