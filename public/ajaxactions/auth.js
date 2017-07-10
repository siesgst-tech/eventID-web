// Login
$(document).ready(function(){
    $('#login-button').removeAttr('disabled');
         
    $("#LoginForm").submit(function (e) {
        $('#login-button').html('<i class="fa fa-circle-o-notch fa-spin"></i> Logging in...');
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
        e.preventDefault(); 
        var FORM_DATA = {
            email: $('#email').val(),
            password: $('#password').val(),
        }
        var POST_URL = "/auth/login";
        $.ajax({
            type: "POST",
            url: POST_URL,
            data: FORM_DATA,
            dataType: 'json',
            success: function (response) {
                data = jQuery.parseJSON(JSON.stringify(response));
                if(data.status == 'fail') {
                    $('#login-button').html('LOGIN');
                    $("#error").text(data.message);
                    $("#error").show();
                }
                else if(data.status == 'success') {
                    $('#login-button').attr('disabled', 'true');
                    setTimeout(function(){ 
                        window.location.href = '/'+data.message+'/home';
                    }, 1000);
                }
                else {
                    $('#login-button').html('LOGIN');
                    $("#error").text("Something went Wrong !");
                    $("error").show();
                }
            },
            error: function (data) {
                $('#login-button').html('LOGIN');
                $("#error").text("Something went Wrong !");
                $("error").show();
            }
        });
    });
});


//Register
$(document).ready(function(){
    $('#register-button').removeAttr('disabled');
         
    $("#RegisterForm").submit(function (e) {
        $('#register-button').html('<i class="fa fa-circle-o-notch fa-spin"></i> Signing Up...');
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
        e.preventDefault(); 
        var FORM_DATA = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
        }
        var POST_URL = "/auth/register";
        $.ajax({
            type: "POST",
            url: POST_URL,
            data: FORM_DATA,
            dataType: 'json',
            success: function (response) {
                data = jQuery.parseJSON(JSON.stringify(response));
                if(data.status == 'fail') {
                    $('#register-button').html('SIGN UP FOR FREE');
                    $("#error").text(data.message);
                    $("#success").hide();
                    $("#error").show();
                }
                else if(data.status == 'success') {
                    $('#register-button').html('SIGN UP FOR FREE');
                    $("#success").text(data.message);
                    $("#error").hide();
                    $("#success").show();
                }
                else {
                    $('#login-button').html('SIGN UP FOR FREE');
                    $("#error").text("Something went Wrong !");
                    $("#success").hide();
                    $("#error").show();
                }
            },
            error: function (data) {
                $('#login-button').html('LOGIN');
                $("#error").text("Something went Wrong !");
                $("#success").hide();
                $("error").show();
            }
        });
    });
});