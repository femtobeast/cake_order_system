$(document).ready(function () {

    $("#addcakeform").submit(function (event) {
        event.preventDefault();
        var formdata = new FormData();
        const cakedata = {
            cakename: $("#cakename").val(),
            desc: $("#desc").val(),
            flavourtype: $('#flavourtype').val(),
            serve: $("#serve").val(),
            version: $("#version").val(),
            size: $("#size").val(),
            price: $("#price").val(),
            flavourname: $("#flavourname").val(),
            cakeimage: $('#cakeimage')[0].files[0]
        }
        console.log(cakedata)
        for (key in cakedata) {
            formdata.append(key, cakedata[key]);
        }
        $.ajax({
            url: "/admin/cakeAdd",
            method: "POST",
            headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
            processData: false,
            contentType: false,
            data: formdata,
            dataType: 'json',

            success: function (result, status) {
                window.location.href = "http://localhost:1234/admin/acd"
                // console.log(result);
                alert(result.message)



            },
            error: function (jqXHR) {
                console.log(jqXHR);
                // $("#message").html(jqXHR.responseText);
                $("#message").html(jqXHR.responseText);


            }
        })
    })

    //deletecake
    $('#cakeList').on('click', '#bdelete', function () {
        console.log($(this)[0].attributes.cid.nodeValue);
        cid = $(this)[0].attributes.cid.nodeValue;
        var deleteConfirm = confirm("Are your Sure??");
        if (deleteConfirm == true) {
            $.ajax({
<<<<<<< HEAD
                url: "http://localhost:1234/admin/cakedelete/" + cid,
                headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
=======
                url: "/admin/cakedelete/" + cid,
>>>>>>> 9203b2f90af03ee08ace832248cbb23bd8fe02dd
                method: "DELETE",
                dataType: 'json',
                success: function (result, status) {
                    window.location.href = "http://localhost:1234/admin/vc"
                    alert(result.message)
                    // $("#message").html(result.message);


                },
                error: function () {


                }


            })
        } else {

        }


    })
    //get individual cake
    $('#cakeList').on('click', '#ucbutton', function () {
        //this is the userid
        cid = $(this)[0].attributes.cid.nodeValue;


        $.ajax({

            url: 'http://localhost:1234/admin/getindividualcake/' + cid,
            headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
            method: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('#cakename').val(result.cake_name)
                $('#flvname').empty().append(result.flavour_name)
                $('#flavourtype').val(result.flavour_type)
                $('#price').val(result.cake_price)
                $('#serve').val(result.serves)
                $('#version').val(result.version)
                $('#size').val(result.pound)
                $('#cakeimage').text(result.cake_image)
                $('#desc').val(result.descriptions)


                $('#Icakeimage').append(
                    '<img class="rounded" src="http://localhost:1234/uploads/' + result.cake_image + '" alt="User Avatar" width="110">'
                )


            },
            error: function () {

            }
        })


    })


    var flavourname = new Array();
    //get flavour data in onclick in select option
    $('#cakeList').on('click', '#ucbutton', function () {
        $.ajax({
            url: 'http://localhost:1234/admin/gffso/',
            headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },

            method: 'GET',
            dataType: 'json',
            success: function (result) {
                // flavourname.pop();
                // flavourname.push(result);
                // $.each(flavourname, function (index, flvdata) {
                var len = result.length;

                $("#flavourname").empty();
                // for( var i = 0; i<len; i++){
                //     var id = response[i]['id'];
                //     var name = response[i]['name'];
                for (key = 0; key < result.length; key++) {

                    console.log(result[key].flavour_name);
                    // $("#sel_user").append("<option value='" + id + "'>" + name + "</option>");

                    $('#flavourname').append("<option>" + result[key].flavour_name + "</option>")
                    // $(".dynm_drop").clone().appendTo("class or id of element");
                }

                // })
                // $('#flvname').hide()
            },
            error: function (err) {
                console.log(err)
            }
        })
    });

    //update cake
    var cid;
    $("#updatecake1").submit(function (e) {
        e.preventDefault();
        var formdata = new FormData();
        var updatecake = {
            cakename: $('#cakename').val(),
            flavourname: $('#flavourname').val(),
            flavourtype: $('#flavourtype').val(),
            price: $('#price').val(),
            version: $('#version').val(),
            cakeimage: $("#cakeimage").val(),
            size: $("#size").val(),
            serve: $("#serve").val(),
            desc: $("#desc").val()





            // $('#flvname').empty().append(result.flavour_name)
            // $('#flavourtype').val(result.flavour_type)
            // $('#price').val(result.cake_price)
            // $('#serve').val(result.serves)
            // $('#version').val(result.version)
            // $('#size').val(result.pound)
            // $('#cakeimage').text(result.cake_image)
            // $('#desc').val(result.descriptions)

        }
        $.ajax({
            url: 'http://localhost:1234/admin/updatecake/' + cid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
            method: "PUT",
            contentType: 'application/json',
            dataType: 'json',
            // headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
            data: JSON.stringify(updatecake),
            success: function (result) {
                console.log(result)
                console.log("cake data updated")

                // window.location.href = "Medicineinfo.html"
                // your logic here , redirect to another page or show message etc
            },
            error: function (jqXHR) {
                $("#message").html(jqXHR.responseText);
                // alert($("#message").innerhtml(jqXHR.responseText);
                // console.log($("#message").html(jqXHR.responseText))


            }

        })
    });

    //add staff
    $("#addstaffform").submit(function (event) {
        event.preventDefault();
        // alert("added")
        const staffdata = {

            staff_firstname: $("#staff_firstname").val(),
            staff_lastname: $("#staff_lastname").val(),
            saddress: $('#saddress').val(),
            email: $("#email").val(),
            department: $("#department").val(),
            phonenumber: $("#phonenumber").val()
        }

        $.ajax({
            headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
            url: "http://localhost:1234/admin/as",
            method: "POST",
            data: JSON.stringify(staffdata),
            contentType: "application/json",
            dataType: "json",
            success: function (result) {
                alert(result.message);
                window.location.href = "/admin/astaff"
                // console.log(result);
            },
            error: function (jqXHR) {
                console.log(jqXHR);
                $("#message").html(jqXHR.responseText);

            }
        })
    })

    //deletestaff
    $('#staffList').on('click', '#bdelete', function () {
        console.log($(this)[0].attributes.sid.nodeValue);
        sid = $(this)[0].attributes.sid.nodeValue;
        var deleteConfirm = confirm("Are your Sure??");
        if (deleteConfirm == true) {
            $.ajax({
                url: "http://localhost:1234/admin/staffdelete/" + sid,
                headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
                method: "DELETE",
                dataType: 'json',
                success: function (result, status) {
                    window.location.href = "http://localhost:1234/admin/vstaff"
                    console.log(result.message)
                    $("#message").html(result.message);


                },
                error: function () {


                }


            })
        } else {

        }


    })

    //getindividual staff data
    $('#staffList').on('click', '#usbutton', function () {
        //this is the userid
        sid = $(this)[0].attributes.sid.nodeValue;
        console.log(sid)


        $.ajax({

            url: 'http://localhost:1234/admin/getindividualstaff/' + sid,
            headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
            method: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('#sfname').val(result.first_name)
                $('#slname').val(result.last_name)
                $('#saddress').val(result.address)
                $('#phonenumber').val(result.phonenumber)
                $('#department').val(result.department)
                $('#email').val(result.email)




            },
            error: function () {

            }
        })


    })

    //update individual staff
    var sid;
    $("#updatestaff1").submit(function (e) {
        e.preventDefault();
        //     alert("yes");
        // })
        var updatestaff = {
            sfname: $('#sfname').val(),
            slname: $('#slname').val(),
            saddress: $('#saddress').val(),
            email: $("#email").val(),
            department: $("#department").val(),
            phonenumber: $("#phonenumber").val()

        }
        $.ajax({
            url: 'http://localhost:1234/admin/updatestaff/' + sid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
            method: "PUT",
            headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(updatestaff),
            success: function (result) {
                console.log(result)


                // window.location.href = "Medicineinfo.html"
                // your logic here , redirect to another page or show message etc
            },
            error: function (jqXHR) {
                console.log(jqXHR)
                // $("#message").html(jqXHR.responseText);
                // alert($("#message").innerhtml(jqXHR.responseText);
                // console.log($("#message").html(jqXHR.responseText))


            }

        })

        //geting login admin data
        var adminid = window.localStorage.getItem('admin_id');
        $.ajax({

            url: 'http://localhost:1234/admin/profiledata' + adminid,
            method: 'GET',
            dataType: 'json',
            headers: { 'authorization': 'Bearer ' + window.localStorage.getItem('token') },
            success: function (result, status) {
                console.log(result)




            },
            error: function (jqXHR, status) {
                // console.log(jqXHR);
            }
        })


    });

    //update admin profile
    $('#updateLoginUser').submit(function (e) {
        e.preventDefault();


        var updateadmin = {


            updateadminfname: $('#updateadminfname').val(),
            updateadminlname: $('#updateadminlname').val(),
            updateadminaddress: $('#updateadminaddress').val(),
            updateadminemail: $('#updateadminemail').val(),
            updateadminphone: $("#updateadminphone").val(),
            updateadminpassword: $('#updateadminpassword').val()





        }
        // console.log(updateadmin);
        adminid = localStorage.getItem('admin_id');
        console.log(adminid)

        // alert("i am here")
        $.ajax({

            url: 'http://localhost:1234/admin/updateadminprofile/' + adminid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
            headers: { 'authorization': 'Bearer' + window.localStorage.getItem('token') },
            method: "PUT",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(updateadmin),
            success: function (result) {
                console.log(updateadmin.updateadminfname)
                window.localStorage.setItem('first_name', updateadmin.updateadminfname);
                window.localStorage.setItem('last_name', updateadmin.updateadminlname);
                window.localStorage.setItem('email', updateadmin.updateadminemail);
                window.localStorage.setItem('address', updateadmin.updateadminaddress);
                window.localStorage.setItem('phone', updateadmin.updateadminphone);

                // console.log(result);
                alert(result.message);
                // your logic here , redirect to another page or show message etc
                window.location.href = "http://localhost:1234/admin/profile"


            },
            error: function (jqXHR) {
                console.log(jqXHR)
                $("#message").html(jqXHR.responseText);


            }

        })


    })





})