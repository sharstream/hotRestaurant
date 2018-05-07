var api_key = 'key-XXXXXXXXXXXXXXXXXXXXXXX';
var domain = 'www.hot-restaurant-atl.herokuapp.com';
var mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: domain
});

var data = {
    from: 'Excited User <daverioverde@gmail.com>',
    to: 'example@mail.ru',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, function (error, body) {
    console.log(body);
});

module.exports = mailgun;