//google sign in
function onSignIn(googleUser) {
    // Retrieve the Google account data
    gapi.client.load('oauth2', 'v2', function () {
        var request = gapi.client.oauth2.userinfo.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
            console.log(resp);
     
            // Display the user details
            var profileHTML = '<h3>Welcome ' +
                resp.given_name + '! <a href="javascript:void(0);" onclick="onSignOut();">Sign out</a></h3>';
            profileHTML += '<img src="' + resp.picture + '"/><p><b>Google ID: </b>' + resp.id + '</p><p><b>Name: </b>' + resp.name + '</p><p><b>Email: </b>' + resp.email + '</p><p><b>Gender: </b>' + resp.gender + '</p><p><b>Locale: </b>' + resp.locale + '</p><p><b>Google Profile:</b> <a target="_blank" href="' + resp.link + '">click to view profile</a></p>';
            document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
            document.getElementById("gSignIn").style.display = "none";
            document.getElementsByClassName("userContent")[0].style.display = "block";

        });
    });


}
//google sign out
function onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have loged out!! Session Out")
        window.location.href = "/user/login"
    });
    auth2.disconnect();
}


function addCustomerAPI(resp) {
    alert(addCustomerByGoogleUser)
    // var userdetail = {
    //     firstname: resp.given_name,
    //     lastname: resp.family_name,
    //     email: resp.email
    // }

    // $.ajax({
    //     url: addCustomerByGoogleUser,
    //     method: "POST",
    //     contentType: "application/json",
    //     dataType: "json",
    //     data: JSON.stringify(userdetail),
    //     success: function (result, status) {
    //         redirectPage("/user/cp");

    //     },
    //     error: function (err, status) {
    //         alert('Google Data not saved');
    //     }
    // });
}

// Sign-in failure callback
function onFailure(error) {
    alert(error);
}

function redirectPage(path) {
    return window.location.href = path;;
}

function renderButton() {
    gapi.signin2.render('gSignIn', {
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': onFailure
    });
}//not used

// $.getScript("/js/custom/apiurl.js")
// .done(function (script, textStatus) {
//     alert(BASE_URL);
// })
// .fail(function (jqxhr, settings, exception) {
//     console.log(jqxhr);
// });
// var search = function searc(n) { return n < 2 ? 1 : n * searc(n - 1); };

// Sign out the user
// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         document.getElementsByClassName("userContent")[0].innerHTML = '';
//         document.getElementsByClassName("userContent")[0].style.display = "none";
//         document.getElementById("gSignIn").style.display = "block";
//     });

//     auth2.disconnect();
// }
