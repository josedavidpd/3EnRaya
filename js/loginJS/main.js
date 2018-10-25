$(document).ready(function () {

    $("#btn-login").on('click', function (e) {
        e.preventDefault();
        var em = $('#email').val();
        var pwd = $('#password').val();

        $.ajax({
                method: "POST",
                url: "http://www.miguelcamposrivera.com:3008/tictactoeapi/auth/login",
                dataType: "json",
                data: {
                    email: em,
                    password: pwd
                }
            })
            .done(function (user) {
                localStorage.setItem("token", user.token);
                localStorage.setItem("username", user.username);
                localStorage.setItem("email", user.email);


                location.replace('../../3EnRaya/html/ranking.html');
            })
            .fail(function (resp) {
                $("#errorLogin").removeClass('d-none');
                console.log("ERROR RESPUESTA");
                console.log(resp);
            });

    });
    (function ($) {
        var input = $('.validate-input .input100');

        $('.validate-form').on('submit', function () {
            var check = true;

            for (var i = 0; i < input.length; i++) {
                if (validate(input[i]) == false) {
                    showValidate(input[i]);
                    check = false;
                }
            }

            return check;
        });


        $('.validate-form .input100').each(function () {
            $(this).focus(function () {
                hideValidate(this);
            });
        });

        function validate(input) {
            if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
                if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                    return false;
                }
            } else {
                if ($(input).val().trim() == '') {
                    return false;
                }
            }
        }

        function showValidate(input) {
            var thisAlert = $(input).parent();

            $(thisAlert).addClass('alert-validate');
        }

        function hideValidate(input) {
            var thisAlert = $(input).parent();

            $(thisAlert).removeClass('alert-validate');
        }




    });


});
(jQuery)