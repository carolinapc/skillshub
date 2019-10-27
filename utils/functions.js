const sgMail = require("@sendgrid/mail");
require("dotenv").config();

let sendEmail = (email, subject, htmlBody) => {
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "noreply@skillshub.com",
    subject: subject,
    //text: "send as plain/text"
    html: htmlBody
  };
  sgMail.send(msg);
};

module.exports = {
  sendEmail: sendEmail
};