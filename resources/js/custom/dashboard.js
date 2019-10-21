$(document).ready(function () {
    //display the total delivery 
    $.getJSON('http://localhost:1234/admin/countdelivery', function (result) {
        // console.log(result);
        $('#counttotaldelivery').text(result[0].co)
        //     }
    })

    //display the total today delivery 
    $.getJSON('http://localhost:1234/admin/counttotalorder', function (result) {
        // console.log(result);
        $('#totalorder').text(result[0].co)
        $('#totalorder1').text(result[0].co)
        //     }
    })
})

//display the total amount of saole
$.getJSON('http://localhost:1234/admin/countsaleamount', function (result) {
    console.log(result);

    // $('#totalorder1').text(result[0].co);
})