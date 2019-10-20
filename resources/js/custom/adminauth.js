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

                window.location.href = "http://localhost:1234/admin/profile";

            },
            error: function (jqXHR, error) {

                // console.log(jqXHR);
                $("#message").html(jqXHR.responseJSON.message);

            }
        })
    })

});