define(['jquery', 'api_url'], function ($, main) {

    //LOGIN AJAX 
    $('#loginbtn').on('click', function () {
        alert(BASE_URL)

    });


    //REGISTER AJAX 
    $('#btnRegister').on('click', function () {

        var customerData = {
            email: document.getElementsByName('email')[0].value,
            password: document.getElementsByName('password')[0].value,
            cpassword: document.getElementsByName('cpassword')[0].value,
            phone: document.getElementsByName('phone')[0].value,
            birthday: document.getElementsByName('birthday')[0].value,
            address: document.getElementsByName('address')[0].value,
            gender: document.getElementsByName('gender')[0].value,
            firstname: document.getElementsByName('firstname')[0].value,
            lastname: document.getElementsByName('lastname')[0].value
        }
        console.table(addCustomerByGoogleUser);
        $.ajax({
            url: addCustomerByGoogleUser,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(customerData),
            success: function (result, status) {
                console.log(result.message)
                $('#errors').html(result.message);
                //    alert(result + " success register")

            },
            error: function (err, status) {

                $('.error-group').css('display', 'block');
                var errors = JSON.parse(err.responseText);
                var errorsContainer = $('#errors');
                errorsContainer.innerHTML = '';
                var errorsList = '';

                for (var i = 0; i < errors.length; i++) {
                    errorsList += '<li>' + errors[i].msg + '</li>';
                }
                errorsContainer.html(errorsList);
            }
        });

    });


});
$('#email').on('keyup', function (e) {
    e.preventDefault();
    // if (e.which == 13) {

    var customerData = {
        email: document.getElementsByName('email')[0].value
    }

    $.ajax({
        url: checkEmail,
        method: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(customerData),
        success: function (result, status) {

        },
        error: function (err, status) {
            if (err.status == '404') {
                $('#msg').html('');
            } else {
                $('#msg').html(err.responseJSON.message);

            }
        }
    });
    // }

});
function redirectPage(path) {
    return window.location.href = path;;
}
// (function() {
//     document.body.addEventListener("load", function onBodyLoaded() {
//         require(["two"], function(two) {
//             two.value();
//         });
//     });
// }());