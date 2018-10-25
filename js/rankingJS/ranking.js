$(document).ready(function() {
  //Conexión del ranking con el servidor
  var token = localStorage.getItem("token");
  var username = localStorage.getItem("username");

  $.ajax({
    method: "GET",
    url: "http://www.miguelcamposrivera.com:3008/tictactoeapi/user/ranking",
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
  })
    .done(function(resp) {
      $(".nombreUsuario").html(username);
      resp.forEach(usuario => {
        $("#ranking").append(` <tr>
                                <th scope="row">1</th>
                                <td><span class="text-capitalize">${
                                  usuario.username
                                }</span></td>
                                <td>${usuario.time}</td>
                                <td><span class="font-weight-bold">${
                                  usuario.points
                                }</span></td>
                              </tr>`);
      });
    })
    .fail(function(resp) {
      console.log("ERROR RESPUESTA");
      console.log(resp);
    });

  $("#btn-logout").on("click", function() {
    localStorage.clear();
    location.replace("../../html/login.html");
  });
});
