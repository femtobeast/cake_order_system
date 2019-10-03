var tempCakeId;

define(['jquery', 'api_url'], function ($, main) {

    $('.aa-product-hvr-content').on('click', '#quickViewBtn', function () {

        aid = $(this)[0].attributes.aid.nodeValue;

        var path = "http://localhost:1234/uploads/";
        var caked = aid.split(',');
        var tempCakeName = caked[0];//cake_price
        var tempCakeImage = caked[1];//cake_price
        var tempCakePrice = caked[2];//cake_price
        var tempCakeDesc = caked[3];//descriptions
        var tempCakeFlavourType = caked[4];//descriptions
        tempCakeId = caked[5];//descriptions

        $("#vcakeimg").attr("src", path + tempCakeImage);
        $("#vcakename").text(tempCakeName);
        $("#vcakeprice").text(tempCakePrice);
        $("#vcakedesc").text(tempCakeDesc);
        $("#vcakeFtype").text(tempCakeFlavourType);
    });

    $('.aa-prod-view-bottom').on('click', '#quickAddToCart', function () {     
        $.ajax({
            url: "http://localhost:1234/user/add-to-cart/" + tempCakeId,
            method: "GET",
            dataType: "json",
            // headers: { authorization: "Bearer " + window.localStorage.getItem('token') },
            success: function (result, status) {
             alert('success')
            },
            error: function (jqXHR, status) {
             window.location.href = '/user/dashboard'
            }
        });
    });
});

// $(document).ready(function () {

    // $('#men').on('click', '.aa-add-card-btn', function () {
    //     cartdata = $(this)[0].attributes.cartdata.nodeValue;

    //     var path = "http://localhost:1234/uploads/cakeimage-1569451050010.jpg";
    //     var caked = cartdata.split(',');
    //     var tempCakeName = caked[0];//cake_price
    //     var tempCakeImage = caked[1];//cake_price
    //     var tempCakePrice = caked[2];//cake_price
    //     var tempCakeDesc = caked[3];//descriptions


        // var data = [];
        // $(this)
        //     .find('a')
        //     .each(function () {
        //         var $this = $(this);

        //         // Collect the data with the id and value
        //         data.push({
        //             id: $this.data('id'),
        //             value: $this.val()
        //         });
        //     });
        // var tempCakeId = caked[0];//cake_id
        // var tempCakeName = caked[1];//cake_name
        // var tempCakePound = caked[2];//pound
        // var tempCakeImage = caked[3];//cake_image
        // var tempCakeFlavourId = caked[4];//flavour_id
        // var tempCakeDesc = caked[5];//descriptions
        // var tempCakeflavourType = caked[6];//flavour_type
        // var tempCakePrice = caked[7];//cake_price
        // var tempCakeServes= caked[8];//serves
        // var tempCakeVersion= caked[9];//version egg or eggless
        // // { "cake_id": 3, "cake_name": "Apple Cake ", "pound": "2", "cake_image": "cakeimage-1569451050010.jpg", "flavour_id": 23, "descriptions": "Cake", "flavour_type": "s", "cake_price": 2000, "serves": 2, "version": "Egg", "createdAt": "2019-09-25T22:37:30.000Z", "updatedAt": "2019-09-25T22:37:30.000Z" }


        // for (i = 0; i < caked.length; i++) {
        //     console.log(caked[i])
        // }



    // })

// });

