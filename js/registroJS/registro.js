/*$(document).ready(function () {

    const regexSoloLetras = /^[a-zA-Z]+$/;

    

    $("#formRegistro").on('submit', (e) => {
        
        if (regexSoloLetras.test($("#nombreRegistro").val().trim())) {
            $("#errorNombre").addClass("d-none");
            return true;
        } else {
            $("#errorNombre").removeClass("d-none");
            return false;

   
    

    }});

    $("#formRegistro").on('submit', (e) => {

        if (regexSoloLetras.test($("#apellidosRegistro").val().trim())) {
            $("#errorApellidos").addClass("d-none");
            return true;
        } else {
            $("#errorApellidos").removeClass("d-none");
            return false;




        }
    });
    

    
});*/