//count every time somebody makes a reservation

let count = 0;
let waitlist = []; //array of string
let reservations = require("../data/reservations.js")

//identify routes for each request
// Routes
// =============================================================
module.exports = (app) => {
    // Basic route that sends the user first to the AJAX Page

    //resturn all the reservation data
    app.get("/api/table", (req, res) => {
        // res.json(reservations.slice(0, 4));
        return res.json(reservations);
    });
    //display waiting list
    app.get("/api/waitlist", (req, res) => {
        // res.json(reservations.slice(5));
        if (waitlist.length > 0) {
            return res.json(waitlist);
        }
        console.log('waitlist empty!!!');
    });

    //POST METHOD
    //create a reservation data
    app.post("/api/reserve", (req, res) => {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        let newreservation = req.body;
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newreservation.name = newreservation.name.replace(/\s+/g, "").toLowerCase();
        console.log(newreservation);

        if (reservations.length <= 5) {
            reservations.push(newreservation);
            res.json(newreservation);
            console.log('reservation: ' + reservations);
        } else {
            waitlist.push(newreservation);
            res.json(newreservation);
            console.log('waitlist: ' + waitlist)
        }
    });
    //reset application
    app.post("/api/clear", (req, res) => {
        reservations = [];
        waitlist = [];
        console.log(reservations);
    });
    app.delete('/api/tables', (req, res) => {
        console.log('table deleted!!!');
        reservations.splice(0, 5);
        res.json(reservations);
    });
};