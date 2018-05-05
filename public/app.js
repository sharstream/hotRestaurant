// Question: What does this code do??
$(document).ready(function(){
    //event handlers in jquery
    //submit a reservation

    $('#submit').on("click", function(event){
        console.log('Request received: ');
        event.preventDefault();

        let newreservation = {
            name: $('#name').val().trim(),
            phoneNumber: $('#number').val().trim(),
            email: $('#email').val().trim(),
            UniqueID: $('#id').val().trim()
        };

        $.ajax({
            url: "/api/reserve",
            data: JSON.stringify(newreservation),
            contentType: 'application/json',
            method: 'POST',
            success: (data) => {
                var ret = jQuery.parseJSON(data);
                $('#lblResponse').html(ret.msg);
                console.log('Success: ')
            },
            error: (xhr, status, error) => {
                console.log('Error: ' + error.message);
                $('#lblResponse').html('Error connecting to the server.');
            }
        });
        //write the logic to submit the reservation to the back-end
        console.log(JSON.stringify(newreservation));
        $('#name').val().text('');
        $('#number').val().text('');
        $('#email').val().text('');
        $('#id').val().text('');
    });
    //display reservation

    //send message

    //

});