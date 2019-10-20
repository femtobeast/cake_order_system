$(document).ready(function () {
    //update the notapproval order
    var orderid;
    $("#updateorderstatus").submit(function (e) {
        e.preventDefault();
        var updateorderstatus = {
            orderstatus: $('#orderstatus').val(),
            assignwork: $('#assignwork').val(),
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
            url: 'http://localhost:1234/admin/staffdataorder',
            method: 'GET',
            dataType: 'json',
            success: function (result) {
                var len = result.length;

                $("#assignwork").empty();
                // for( var i = 0; i<len; i++){
                //     var id = response[i]['id'];
                //     var name = response[i]['name'];
                for (key = 0; key < result.length; key++) {

                    console.log(result[key].first_name);
                    // $("#sel_user").append("<option value='" + id + "'>" + name + "</option>");

                    $('#assignwork').append("<option>" + result[key].first_name + " " + result[key].last_name + "</option>")
                    // $(".dynm_drop").clone().appendTo("class or id of element");
                    console.log(result)

                }
            },
            error: function (jqXHR) {
                $("#message").html(jqXHR.responseText);



            }

        })
    })


})