//count every time somebody makes a reservation
require("dot-env").config;
let keys = require('../js/keys.js');
var twilio = require('twilio');
var client = new twilio('AC091aa895564901fb38c68840734ce1f7', 'da2e79f5f5bcf273adf4e7313a6a02de');
let parseNumber = require("libphonenumber-js");
var mailgun = require('mailgun-js')({
    apiKey: 'pubkey-fba3365b4756d6cad14715ce4f68a425',
    domain: 'gmail.com'
});
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

        client.messages.create({
                body: 'Hello Aaron from Hot Restaurant',
                to: '+18139526965', // Text this number
                from: '+181 39526965 - (813) 737-0574' // From a valid Twilio number
            })
            .then((message) => console.log(message.sid));

        var data = {
            from: 'Excited User <daverioverde@gmail.com>',
            to: 'aaronchapman95@mail.com',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomeness!'
        };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });
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