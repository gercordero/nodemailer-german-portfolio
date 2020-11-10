const { Router } = require("express");
const validateContactInput = require("../validation/contact-validation");
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const auth = require("../keys/mailgun-key");

//Initializations
const router = Router();

// @route   Post /api/contact
// @desc    Send email
// @access  Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateContactInput(req.body);

  //Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  //Create a html message that will be send to the desire email
  const output = `
    <h2>You have a new contact request</h2>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(mailgun(auth));

  //Email where the message is going to be send
  const email = process.env.MAIL;

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"German Portfolio" gcordero@meetgerman.com', // sender address
    to: email, // list of receivers
    subject: "Web portfolio contact request", // Subject line
    text: "", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res
        .status(400)
        .json({ status: "There was a problem when trying to send the email" })
        .send(error);
      return console.log(error);
    }
    console.log("Message sent!");

    res.status(200).json({ status: "Message sent!" });
  });
});

module.exports = router;
