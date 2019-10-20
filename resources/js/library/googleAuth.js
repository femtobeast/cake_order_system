
//google sign in
function onSignIn(googleUser) {
    // Retrieve the Google account data
    gapi.client.load('oauth2', 'v2', function () {
        var request = gapi.client.oauth2.userinfo.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
            // // Display the user details
            // var profileHTML = '<h3>Welcome ' +
            //     resp.given_name + '! <a href="javascript:void(0);" onclick="onSignOut();">Sign out</a></h3>';
            // profileHTML += '<img src="' + resp.picture + '"/><p><b>Google ID: </b>' + resp.id + '</p><p><b>Name: </b>' + resp.name + '</p><p><b>Email: </b>' + resp.email + '</p><p><b>Gender: </b>' + resp.gender + '</p><p><b>Locale: </b>' + resp.locale + '</p><p><b>Google Profile:</b> <a target="_blank" href="' + resp.link + '">click to view profile</a></p>';
            // document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
            // document.getElementById("gSignIn").style.display = "none";
            // document.getElementsByClassName("userContent")[0].style.display = "block";
            addCustomerAPI(resp);

        });
    });


}
//google sign out
function onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have loged out!! Session Out")
        window.location.href = "/user/logout"
    });
    auth2.disconnect();
    
}

function checkIfLoggedIn() {
    if (sessionStorage.getItem('myUserEntity') == null) {
        //Redirect to login page, no user entity available in sessionStorage
        window.location.href = '/user/dashboard';
    } else {
        //User already logged in
        var userEntity = {};
        userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));

    }
}

function addCustomerAPI(resp) {
    require(['jquery', 'api_url'], function ($, main) {
        var userdetail = {
            email: resp.email,
            password: "12345678",
            cpassword: "12345678",
            phone: "",
            birthday: getCurrentDate(),
            address: "",
            gender: resp.gender,
            firstname: resp.given_name,
            lastname: resp.family_name
        }       
        sessionStorage.setItem('_g', JSON.stringify(userdetail));
        $.ajax({
            url: addCustomerByGoogleUser,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(userdetail),
            success: function (result, status) {
                redirectPage("/user/profile");

            },
            error: function (err, status) {
                redirectPage("/user/profile");
            }
        });

    });
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
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
} //not used

var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
var scopes = 'profile';
var apiKey = '915969573855-vjr1qlcc9pnevsvp0gnlc4lg5jqk508o.apps.googleusercontent.com';
function handleClientLoad() {
    // Load the API client and auth2 library
    gapi.load('client:auth2', initClient);
}
function initClient() {
    gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: discoveryDocs,
        clientId: '915969573855-vjr1qlcc9pnevsvp0gnlc4lg5jqk508o.apps.googleusercontent.com',
        scope: scopes
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
    }).then(function (resp) {
        console.log(resp)
        var p = document.createElement('p');
        var name = resp.result.names[0].givenName;
        p.appendChild(document.createTextNode('Hello, ' + name + '!'));
        document.getElementById('content').appendChild(p);
    });
}
