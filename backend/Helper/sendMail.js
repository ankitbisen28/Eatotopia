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

    // console.log(hashedToken);
    if ((emailType === "RESET")) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }
    // console.log(emailType);

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
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${emailType.toLowerCase()}?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "reset your password"
      }</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
