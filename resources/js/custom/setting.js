
var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
// var name = url.searchParams.get("name");
// var uemail = url.searchParams.get("email");
//first store username and password
var storedName = localStorage.getItem('name');
var storedEmail = localStorage.getItem('emails');


if (storedName == 'null' || storedEmail == 'null') {
    // console.log("null")
    $('#unames').html(storedName);
} else {
    // console.log("noot null");
    $('#unames').html(storedName);
}

// storing input from register-form
function store() {
    // localStorage.setItem('name', name);
    // localStorage.setItem('emails', uemail);
}
// check if stored data from register-form is equal to entered data in the   login-form
function check() {
    // stored data from the register-form
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('emails');

    // entered data from the login-form
    var username = document.getElementById('username');
    var email = document.getElementById('email');

    // check if stored data from register-form is equal to data from login form
    if (username.value !== storedName || email.value !== storedPw) {
        alert('ERROR');
    } else {
        alert('You are loged in.');
    }
}

// function setSuccessMessage(msg) {
//     $(".msgdiv").addClass("done");
//     $('#msg').html(msg);
// }

// function setErrorMessage(msg) {
//     $(".msgdiv").addClass('error');
//     $('#msg').html(msg);

// }

function setSuccessMessage(msg) {

    $('.msgdiv').show();
    $(".msgdiv").addClass("done");
    $('#msg').html(msg);
    holdContent();
}

function setErrorMessage(msg) {

    $('.msgdiv').show();
    $(".msgdiv").addClass('error');
    $('#msg').html(msg);
    holdContent();

}

function loadFirst() {
    $('#workLoader').show();
    load = setTimeout(function () {
        $('#workLoader').hide();
    }, 2000);

}

function alertSuccess(msg) {
    $('.alert').show();
    $(".alert").removeClass("alert-danger");
    $(".alert").addClass("alert-secondary");
    $('#msg').html(msg);
    holdContent();

}

function alertError(msg) {
    $('.alert').show();
    $(".alert").addClass('alert-danger');
    $('#msg').html(msg);
    holdContent();


}

function holdContent() {
    window.setTimeout(function () {
        $('.alert').hide();
    }, 5000);
    window.setTimeout(function () {
        $('.msgdiv').hide();
    }, 4000);
}