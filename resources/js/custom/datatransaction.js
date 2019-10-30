require(['jquery', 'api_url'], function ($, main) {

    hideLoad();
    //LOGIN AJAX 
    $('.wrapper-container').on('click', '#login-button', function () {
        var customerData = {
            email: $('#cemail').val(),
            password: $('#cpassword').val()
        }
        showLoad();
        $.ajax({
            url: loginURL,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(customerData),
            success: function (result, status) {
                holdContent();
                redirectPage('/user/dashboard')
                // $('#errors').html(result.message + ": Please refresh or login for checkout.");
            },
            error: function (err, status) {
                holdContent();
                $('#msg').html(err.responseJSON.message);
            }
        });

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
        console.table(addCustomerByUser);
        $.ajax({
            url: addCustomerByUser,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(customerData),
            success: function (result, status) {
                $('#errors').html(result.message + ": Please refresh or login for checkout.");
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

    //CHECKING EMAIL WHILE TYPING
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

    //ORDER PLACED 
    $('#oplacedbtn').on('click', function () {
        // var p1 = document.querySelector('input[name="p1"]:checked').value;
        // var paymentM = p1 === 'Cash on Delivery' ? 'cashondelivery' : 'epay';
        var orderData = {
            receiverName: $('#receiverName').val(),
            order_pdate: document.getElementsByName('ddate')[0].value,
            alias: $('#alias').val(),
            city: $('#city').val(),
            mobileno: $('#mobileno').val(),
            mobileno2: $('#mobileno2').val(),
            oqty: $('#oqty').val(),
            ototalprice: $('#ototal').val(),
            oemail: $('#oemail').val(),
            order_status: 'notapproval',
            doption: document.getElementsByName('doption')[0].value,
            ddate: document.getElementsByName('ddate')[0].value,
            dlocation: document.getElementsByName('dlocation')[0].value,
            paymentM: "cashondelivery",
            cake_id: $('#cake_id').val(),
            orderLength: $('#itemarray').val()
        }
        console.table(orderData);
        $.ajax({
            url: addPlacedOrder,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(orderData),
            success: function (result, status) {
                console.log(result)
                if (result.status == true) {
                    redirectPage('/user/order/');
                }
                // alert('Order is placed. Will be notify as soon as order is confirmed')
            },
            error: function (err, status) {
                // alert('Order is not placed. ')
                alert(err)

            }
        });

    })

    //TRACK ORDER DETAIL PLACED 
    $('#shopGetOrderStatusID').on('click', function () {

        var orderid = { orderid: document.getElementById('orderTrackingId').value };
        $.ajax({
            url: 'http://localhost:1234/user/sendTrackId',
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(orderid),
            success: function (result, status) {
                var orderState = result.order_status;
                if (orderState === 'notapproval') {
                    $("#timeline")
                        .removeClass('order-status-timeline-completion c0')
                        .removeClass('order-status-timeline-completion c1')
                        .removeClass('order-status-timeline-completion c3')
                        .removeClass('order-status-timeline-completion c4')
                        .addClass("order-status-timeline-completion c0");
                } else if (orderState === 'complete') {
                     $("#timeline")
                     .removeClass('order-status-timeline-completion c0')
                     .removeClass('order-status-timeline-completion c1')
                     .removeClass('order-status-timeline-completion c3')
                     .removeClass('order-status-timeline-completion c2')
                     .addClass("order-status-timeline-completion c4");
                } else if (orderState === 'delivered') {
                    $("#timeline")
                    .removeClass('order-status-timeline-completion c0')
                    .removeClass('order-status-timeline-completion c1')
                    .removeClass('order-status-timeline-completion c4')
                    .removeClass('order-status-timeline-completion c2')
                    .addClass("order-status-timeline-completion c3");
                }  else if (orderState === 'progress') {
                    $("#timeline")
                    .removeClass('order-status-timeline-completion c0')
                    .removeClass('order-status-timeline-completion c3')
                    .removeClass('order-status-timeline-completion c4')
                    .removeClass('order-status-timeline-completion c2')
                    .addClass("order-status-timeline-completion c1");
                } else {
                    $("#timeline")
                    .removeClass('order-status-timeline-completion c3')
                    .removeClass('order-status-timeline-completion c1')
                    .removeClass('order-status-timeline-completion c4')
                    .removeClass('order-status-timeline-completion c2')
                    .addClass("order-status-timeline-completion c0");
                }
            },
            error: function (err, status) {
                // alert('Order is not placed. ')
                console.log(err)

            }
        });

    })



    //Update User Profile
    //LOGIN AJAX 
    $('#updateBtn').on('click', function () {
        var customerData = {
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            email: $('#email').val(),
            address: $('#address').val(),
            phone: $('#PhoneNumber').val(),
            password: $('#password').val(),
            // gender: $('#gender').val(),
            birthday: document.getElementsByName('birthday')[0].value,
            gender: document.getElementsByName('gender')[0].value
        }
        showLoad();
        $.ajax({
            url: updateCustomerURL,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(customerData),
            success: function (result, status) {
                holdContent();
                redirectPage('/user/profile')
                // $('#errors').html(result.message + ": Please refresh or login for checkout.");
            },
            error: function (err, status) {
                holdContent();
                console.log(err)
            }
        });

    });

});
function redirectPage(path) {
    return window.location.href = path;;
}

async function holdContent() {
    await window.setTimeout(function () {
        $('#loadingdiv').hide();
    }, 2000);
}

function hideLoad() {
    $('#loadingdiv').hide();
}

function showLoad() {
    $('#loadingdiv').show();
}