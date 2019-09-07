function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $(".g-sign2").css("display", "none");
    $(".data").css("display", "block");
    $("#pic").attr("src", profile.getImageUrl());
    $("#email").text(profile.getEmail());


}

function onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have loged out!! Session Out")
        $(".g-sign2").css("display", "block");
        $(".data").css("display", "none");
    });


}