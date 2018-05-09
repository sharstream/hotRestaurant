// backend
// Dependencies
// =============================================================
let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let app = express();
let PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

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
app.use(express.static('app/www/'))
app.use(express.static('app', options));
app.use("/app/www/style.css", express.static(__dirname + '/app/www/style.css'));
app.use("/app/js/app.js", express.static(__dirname + '/app/js/app.js'));
app.use("/app/js/twilioOAuth.js", express.static(__dirname + '/app/js/twilioOAuth.js'));
app.use("/app/js/maingunOAuth.js", express.static(__dirname + '/app/js/maingunOAuth.js'));

require('./app/routing/api_routes.js')(app);
require('./app/routing/html_routes.js')(app);

//listening port in the server.
app.listen(PORT, () => {
    console.log(`Server started on port `+ PORT);
});