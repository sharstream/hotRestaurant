// Question: What does this code do??
$(document).ready( () => {
    //your code here

    // In this code below we create the Front-end Javascript which "POSTS" our form data to our express server.
    // In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
    // Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
    // In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

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
                if (data == true) {
                    alert("Yay! You are officially booked!")
                }
                // If a table is available... tell user they on the waiting list.
                if (data == false) {
                    alert("Sorry you are on the wait list")
                }
                //clear reservation fields
                console.log(JSON.stringify(newreservation));
                $('#name').val().text('');
                $('#number').val().text('');
                $('#email').val().text('');
                $('#id').val().text('');
            },
            error: (xhr, status, error) => {
                console.log('Error: ' + error.message);
                $('#lblResponse').html('Error connecting to the server.');
            }
        });
        //write the logic to submit the reservation to the back-end
    });

    // In this code, jQuery is used to "download" the data from our server
    // We then dynamically display this content in our table. This is very similar to the group projects you just completed.
    // It's also very similar to the NYT search application. In fact, I copied a ton of code from there.

    //display reservation
    function runTableQuery() {
        // Here we get the location of the root page.
        // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
        var currentURL = window.location.origin;
        // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
        $.ajax({
                url: currentURL + "/api/table",
                method: "GET"
            })
            .done( (tableData) => {
                // Here we are logging the URL so we have access to it for troubleshooting
                console.log("------------------------------------");
                console.log("URL: " + currentURL + "/api/tables");
                console.log("------------------------------------");
                // Here we then log the NYTData to console, where it will show up as an object.
                console.log(tableData);
                console.log("------------------------------------")
                // Loop through and display each of the customers
                for (var i = 0; i < tableData.length; i++) {
                    // Create the HTML Well (Section) and Add the table content for each reserved table
                    var tableSection = $("<div>");
                    tableSection.addClass('well');
                    tableSection.attr('id', 'tableWell-' + i + 1)
                    $('.panel-body').append(tableSection);
                    var tableNumber = i + 1;
                    // Then display the remaining fields in the HTML (Section Name, Date, URL)
                    $("#tableWell-" + i + 1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + tableData[i].name + "</h2>");
                }
            });
    };

    function runWaitListQuery() {
        // Here we get the location of the root page.
        // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
        var currentURL = window.location.origin;
        // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
        $.ajax({
                url: currentURL + "/api/waitlist",
                method: "GET"
            })
            .done( (waitlistData) => {
                // Here we are logging the URL so we have access to it for troubleshooting
                console.log("------------------------------------");
                console.log("URL: " + currentURL + "/api/waitlist");
                console.log("------------------------------------");
                // Here we then log the NYTData to console, where it will show up as an object.
                console.log(waitlistData);
                console.log("------------------------------------")
                // Loop through and display each of the customers
                for (var i = 0; i < waitlistData.length; i++) {
                    // Create the HTML Well (Section) and Add the table content for each reserved table
                    var waitlistSection = $("<div>");
                    waitlistSection.addClass('well');
                    waitlistSection.attr('id', 'waitlistWell-' + i + 1)
                    $('#waitlistSection').append(waitlistSection);
                    var tableNumber = i + 1;
                    // Then display the remaining fields in the HTML (Section Name, Date, URL)
                    $("#waitlistWell-" + i + 1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + waitlistData[i].customerID + "</h2>");
                }
            });
    };
    // This function resets all of the data in our tables. This is intended to let you restart a demo.
    function clearTable() {
        var currentURL = window.location.origin;
        $.ajax({
            url: currentURL + "/api/clear",
            method: "POST"
        })
    };
    $("#clear").on('click', () => {
        alert("Clearing...");
        clearTable();
        // Refresh the page after data is cleared
        location.reload();
    });
    // Run Queries!
    // ==========================================
    runTableQuery();
    runWaitListQuery();
    //send message
});