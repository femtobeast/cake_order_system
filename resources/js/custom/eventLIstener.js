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
        $("#lens_img").attr("data-lens-image", path + tempCakeImage);
        $("#vcakename").text(tempCakeName);
        $("#vcakeprice").text(tempCakePrice);
        $("#vcakedesc").text(tempCakeDesc);
        $("#vcakeFtype").text(tempCakeFlavourType);
    });


    $(".table-responsive").on("keyup", ".aa-cart-quantity", function () {
        var total = 0;
        var total_items = document.getElementById('itemArrLength').value;
        var itemTotalSingle;
        for (i = 1; i <= total_items; i++) {
            itemID = document.getElementById("qnt_" + i);
            itemTotalID = document.getElementById("itemtotal_" + i);

            if (typeof itemID === 'undefined' || itemID === null) {
                alert("No such item - " + "qnt_" + i);
            } else {
                total = total + parseInt(itemID.value) * parseInt(itemID.getAttribute("data-price"));
            }
            itemTotalSingle = parseInt(itemID.value) * parseInt(itemID.getAttribute("data-price"));
            document.getElementById("itemtotal_" + i).innerHTML = itemTotalSingle;
        }
        document.getElementById("finalTotal").innerHTML = total;

    })

    // $('.aa-prod-view-bottom').on('click', '#quickAddToCart', function () {     
    //     $.ajax({
    //         url: "http://localhost:1234/user/add-to-cart/" + tempCakeId,
    //         method: "GET",
    //         dataType: "json",
    //         // headers: { authorization: "Bearer " + window.localStorage.getItem('token') },
    //         success: function (result, status) {
    //          alert('success')
    //         },
    //         error: function (jqXHR, status) {
    //          window.location.href = '/user/dashboard'
    //         }
    //     });
    // });
});

