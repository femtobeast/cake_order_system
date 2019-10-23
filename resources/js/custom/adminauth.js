$(document).ready(function () {
    $("#loginform").submit(function (event) {
        event.preventDefault();
        const adminlogin = {
            email: $("#email").val(),
            password: $("#password").val()
        }
        $.ajax({
            url: "http://localhost:1234/admin/auth",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(adminlogin),
            success: function (result, status) {

                console.log(result.token);
                // console.log(result)
                window.localStorage.setItem('token', result.token);
                window.localStorage.setItem('admin_id', result.result.admin_id);
                window.localStorage.setItem('first_name', result.result.first_name);
                window.localStorage.setItem('last_name', result.result.last_name);
                window.localStorage.setItem('email', result.result.email);
                window.localStorage.setItem('address', result.result.address);
                window.localStorage.setItem('phone', result.result.phone);


                window.location.href = "/admin/profile";

            },
            error: function (jqXHR, error) {

                // console.log(jqXHR);
                $("#message").html(jqXHR.responseJSON.message);

            }
        })
    })




});