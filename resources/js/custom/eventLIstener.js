define(['jquery', 'api_url'], function ($, main) {

    //QUICK LOOK FOR CAKE DETAIL
    $('.aa-product-hvr-content').on('click', '#quickViewBtn', function () {
        aid = $(this)[0].attributes.aid.nodeValue;
        var path = imagePath;
        var caked = aid.split(',');
        var tempCakeName = caked[0];//cake_price
        var tempCakeImage = caked[1];//cake_price
        var tempCakePrice = caked[2];//cake_price
        var tempCakeDesc = caked[3];//descriptions
        var tempCakeFlavourType = caked[4];//cake flavour
        tempCakeId = caked[5];//cake id
        var tempCakePound = caked[6];//number of pound
        var tempCakeServe = caked[7];//number people serve


        console.log(aid)

        $("#vcakeimg").attr("src", path + tempCakeImage);
        $("#lens_img").attr("data-lens-image", path + tempCakeImage);
        $("#vcakename").text(tempCakeName);
        $("#vcakeprice").text(tempCakePrice);
        $("#vcakedesc").text(tempCakeDesc);
        $("#vcakeFtype").text(tempCakeFlavourType);
        $("#vcakepound").text(tempCakePound);
        $("#vcakeServe").text(tempCakeServe);
    });

    $('.aa-product-view-content').on('click', '#lnkViewDetail', function (e) {
        e.preventDefault();      
       
        window.location.href = viewDetailURL + tempCakeId;
    })
    //AUTOMATIC CALCULATION FOR CART QUNATITY AND PRICE DETAIL
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
});

