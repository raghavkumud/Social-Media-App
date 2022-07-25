const nodeMailer = require("nodemailer");
exports.sendEmail = async (options) => {
  /*const transporter = nodeMailer.createTransport({
    host: process.env.SMPT.HOST,
    port: process.env.SMPT_PORT,
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD
    }, 
    service: process.env.SMPT_SERVICE,
  });*/
  var transport = nodeMailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8b0a1658410ba5",
    pass: "57b6af2c2ba510"
  }
});

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transport.sendMail(mailOptions);
};
