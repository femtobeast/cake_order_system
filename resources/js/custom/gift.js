$(document).ready(function () {
    //add gift
    $("#giftform").submit(function (event) {
        event.preventDefault();
        var formdata = new FormData();
        const cakedata = {
            giftname: $("#giftname").val(),
            giftprice: $("#giftprice").val(),
            giftimage: $('#giftimage')[0].files[0]
        }
        console.log(cakedata)
        for (key in cakedata) {
            formdata.append(key, cakedata[key]);
        }
        $.ajax({
            url: "http://localhost:1234/admin/agift",
            method: "POST",
            processData: false,
            contentType: false,
            data: formdata,
            dataType: 'json',

            success: function (result, status) {
                window.location.href = "http://localhost:1234/admin/addgift"
                // console.log(result);
                // location.reload();


            },
            error: function (jqXHR) {
                // console.log(jqXHR);
                // $("#message").html(jqXHR.responseText);
                $("#message").html(jqXHR.responseText);


            }
        })
    })

    //delete gift
    var gid;
    $('#giftList').on('click', '#giftdelete', function () {
        console.log($(this)[0].attributes.gid.nodeValue);
        gid = $(this)[0].attributes.gid.nodeValue;
        var deleteConfirm = confirm("Are your Sure??");
        if (deleteConfirm == true) {
            $.ajax({
                url: "http://localhost:1234/admin/giftdelete/" + gid,
                method: "DELETE",
                dataType: 'json',
                success: function (result, status) {
                    window.location.href = "vc"
                    console.log(result.message)
                    $("#message").html(result.message);


                },
                error: function () {


                }


            })
        } else {

        }


    })



    //getindividual gift data
    $('#giftList').on('click', '#individualgiftview', function () {
        //this is the userid
        gid = $(this)[0].attributes.gid.nodeValue;
        console.log(sid)
        $.ajax({
            url: 'http://localhost:1234/admin/getindividualgift/' + gid,
            method: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('#giftname').val(result.gift_name)
                $('#giftprice').val(result.gift_price)

                $('#giftimage').files(result.gift_image)
            },
            error: function () {

            }
        })


    })

    //update individual gift data
    var gid;

    $("#updategiftform").submit(function (e) {
        e.preventDefault();
        //     alert("yes");
        // })
        var updategift = {
            giftname: $('#giftname').val(),
            giftprice: $('#giftprice').val(),


        }
        $.ajax({
            url: 'http://localhost:1234/admin/updategift/' + gid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
            method: "PUT",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(updategift),
            success: function (result) {
                console.log(result)
            },
            error: function (jqXHR) {
                console.log(jqXHR)
                // $("#message").html(jqXHR.responseText);



            }

        })


    });
});



