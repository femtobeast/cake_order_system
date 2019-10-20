$(document).ready(function () {
    //display the total delivery 
    $.getJSON('http://localhost:1234/admin/countdelivery', function (result) {
        // console.log(result);


        // for (var i = 0; i < result.length; i++) {
        //     for (var j = 0; j <= i; j++) {
        //         // result[i][j].mprice
        //         console.log()
        $('#counttotaldelivery').text(result[0].co)
        //     }
    })

    //display the total today delivery 
    $.getJSON('http://localhost:1234/admin/counttotalorder', function (result) {
        console.log(result);


        // for (var i = 0; i < result.length; i++) {
        //     for (var j = 0; j <= i; j++) {
        //         // result[i][j].mprice
        //         console.log()
        $('#totalorder').text(result[0].co)
        $('#totalorder1').text(result[0].co)
        //     }
    })
})