function onSignIn(google){
    var profile = googleUser.getBasicProfile();
    $(".g-sign2").css("display","none");
    $(".data").css("display","block");
    $("#pic").attr("src",profile.getImageUrl());
    $("#email").text(profile.getEmail());
    

}