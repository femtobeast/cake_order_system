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

    //QUICK LOOK FOR CAKE DETAIL
    $('.qbtn').on('click', '#quickViewBtn1', function () {
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
    ///FEEDBACK ADD    
    $('#fdbtn').on('click', function () {
        var feedbackData = {
            desc: $('#feedbackdesc').val(),
            email: $('#femail').val(),
            cid: $('#cakeid').val(),
        }
        console.table(feedbackData);
        $.ajax({
            url: "http://localhost:1234/user/sendFeedback/",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(feedbackData),
            success: function (result, status) {
                alert('added')
                console.log(result)
            },
            error: function (err, status) {
                console.log(err)
            }
        });

    });

    var locations = new Array();
    ///Search Plan Cake ADD    
    $('#cshop').on('click', function () {
        var shapeCake = document.querySelector('input[name="test"]:checked').value;

        var cakeSearch = {
            "serves": $('#servecake').val(),
            "pound": $('#poundcake').val(),
            "version": $('#sel1').val(),
            "flvname": $('#flavourname').val(),
            "cakeprice": $('#rangevalue').val()
        }
        console.log(cakeSearch)
        $.ajax({
            url: "/user/sendCplan/",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(cakeSearch),
            success: function (result, status) {
                // console.log(result[i].cake_name)
                locations.push(result);
                // $.each(locations, function (index, result) {
                for (i = 0; i < result.length; i++) {
                    $('#cardItem').append('<li class="card_item">\
                        <div class="card">\
                            <div class="card_image"><img width="100" height="auto"\
                                    src="/uploads/'+ result[i].cake_image + '" alt="cake img">\
                                <span id="itemname">'+ result[i].cake_name + '</span>\
                            </div>\
                            <div class="card_content">\
                                <h2 class="card_title">\
                                    <span>Rs. '+result[i].cake_price+'\
                                    </span></h2>\
                                <a href="/user/add-to-cart/'+result[i].cake_id+'" class="card_title"><button>Add to cart</button>\
                                </a>\
                            </div>\
                        </div></li>');
                    }
                // })
                console.log(result)
            },
            error: function (err, status) {
                alert('err')
                console.log(err)
            }
        });

    });


});
