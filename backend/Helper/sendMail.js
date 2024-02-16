const nodemailer = require("nodemailer");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

const sendEmail = async (email, emailType, userId) => {
  try {
    // create a hashed token
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // console.log(userId);
    if (!userId) {
      throw new Error("userId is undefined or null");
    }
    const token = await bcrypt.hash(userId.toString(), 10);
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
      subject: emailType === "RESET" ? "Reset your password" : " ",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/?token=${hashedToken}">here</a> to ${
        emailType === "RESET" ? "reset your password" : " "
      }</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
