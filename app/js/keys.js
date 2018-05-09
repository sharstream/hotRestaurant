console.log('this is loaded');

exports.twilio = {
    accountID: process.env.ACCOUNTID_TWILIO,
    authtoken: process.env.AUTHTOKEN_TWILIO,
};

exports.mailgun = {
    mailgun_key: process.env.MAILGUN_KEY,
    mailgun_domain: process.env.MAILGUN_DOMAIN
};