$(document).ready(function () {
    //update the notapproval order
    var orderid;
    $("#updateorderstatus").submit(function (e) {
        e.preventDefault();
        var updateorderstatus = {
            orderstatus: $('#orderstatus').val()
        }
        console.log(updateorderstatus)

        $.ajax({
            url: 'http://localhost:1234/admin/updateordernotapproval/' + orderid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
            method: "PUT",
            contentType: 'application/json',
            dataType: 'json',
            // headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
            data: JSON.stringify(updateorderstatus),
            success: function (result) {
                console.log(result.message)
                $("#message").html(result.message);

                // console.log("cake data updated")

                // window.location.href = "Medicineinfo.html"
                // your logic here , redirect to another page or show message etc
            },
            error: function (jqXHR) {
                $("#message").html(jqXHR.responseText);
                // alert($("#message").innerhtml(jqXHR.responseText);
                // console.log($("#message").html(jqXHR.responseText))


            }

        })
    })

    $('#notapprovalList').on('click', '#notapproval', function (e) {
        e.preventDefault();
        orderid = $(this)[0].attributes.orderid.nodeValue;
        console.log(orderid)

        $.ajax({

            success: function (result) {

            },
            error: function (jqXHR) {
                $("#message").html(jqXHR.responseText);



            }

        })
    })


})