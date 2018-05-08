//GET METHOD
//go to your home page
let path = require("path");
module.exports = (app) => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../www/home.html"));
    });
    //make a new reservation
    app.get("/reserve", (req, res) => {
        res.sendFile(path.join(__dirname, "../www/reserve.html"));
    });
    //display all the resevations
    app.get("/table", (req, res) => {
        res.sendFile(path.join(__dirname, "../www/table.html"));
    });
};
