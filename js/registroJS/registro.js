$(document).ready(function() {
  //Cuando se pulsa el boton de registro, se cojen los valores de los inputs del registro y se al servidor para crear una nueva cuenta de juego
  $("#btn-registro").on("click", function(e) {
    e.preventDefault();
    var username = $("#nombreRegistro").val();
    var em = $("#emailRegistro").val();
    var pwd = $("#passwordRegistro").val();

    $.ajax({
      method: "POST",
      url: "http://www.miguelcamposrivera.com:3008/tictactoeapi/auth/signup",
      dataType: "json",
      data: { username: username, email: em, password: pwd }
    })
      .done(function(user) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);

        location.replace("../../html/juego.html");
      })
      .fail(function(resp) {
        $("#errorRegistro").removeClass("d-none");
        console.log("ERROR RESPUESTA");
        console.log(resp);
      });
  });
});
