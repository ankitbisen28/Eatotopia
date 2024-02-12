const nodemailer = require("nodemailer");
const User = require("../Models/User");
const { bcryptjs, hash } = require("bcryptjs");

const sendEmail = async (email, emailType, userId) => {
  try {
    // create a hashed token
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const token = await bcryptjs.hash(userId.toString(), 10);
    console.log(email);
    const hashedToken = token
      .split("")
      .filter((char) => characters.includes(char))
      .join("");
    if ((emailType = "RESET")) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: email,
      subject: emailType === "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${emailType.toLowerCase()}?token=${hashedToken}">here</a> to ${
        emailType === "reset your password"
      }</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
