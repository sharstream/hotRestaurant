// backend
// Dependencies
// =============================================================
let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let parseNumber = require("libphonenumber-js");

let app = express();
let PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//middleware function with an elaborate options object
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'js'],
    index: false,
    maxAge: '1d',
    redirect: false,
    fallthrough: true,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

app.use(express.static('public', options));
app.use("/public/app.js", express.static(__dirname + '/public/app.js'));
//count every time somebody makes a reservation
let count = 0;
let waitlist = [];//array of string
let reservations = [
    {
        name: "firstReservation",
        phoneNumber: "8139526965",
        email: "daverioverde@gmail.com",
        UniqueID: 1
    },
    {
        name: "secondReservation",
        phoneNumber: "6781239856",
        email: "localhost@google.com",
        UniqueID: 2
    },
    {
        name: "thirdReservation",
        phoneNumber: "4042341000",
        email: "localhost@facebook.com",
        UniqueID: 3
    }
];

//identify routes for each request
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
//GET METHOD
//go to your home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/home.html"));
});
//make a new reservation
app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "/reserve.html"));
});
//display all the resevations
app.get("/table", (req, res) => {
    res.sendFile(path.join(__dirname, "/table.html"));
});
//resturn all the reservation data
app.get("/api/table", (req, res) => {
    // res.json(reservations.slice(0, 4));
    return res.json(reservations);
});
//display waiting list
app.get("/api/waitlist", (req, res) => {
    // res.json(reservations.slice(5));
    if (waitlist.length>0) {
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

    if(reservations.length <= 5){
        reservations.push(newreservation);
        res.json(newreservation);
        console.log('reservation: ' + reservations);
    }
    else {
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
//listening port in the server.
app.listen(PORT, () => {
    console.log(`Server started on port `+ PORT);
});