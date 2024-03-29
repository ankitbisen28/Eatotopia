const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const sendEmail = require("../Helper/sendMail.js");

const JWT_SECRET = "helloworld";

router.post(
  "/createuser",
  body("email", "Email should be xyz@mail.com").isEmail(),
  body("name", "Name should at least 5").isLength({ min: 5 }),
  body("password", "Password should at least 5").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const name = req.body.name;
    const email = req.body.email;
    const location = req.body.location;

    try {
      const user = await User.create({
        name: name,
        email: email,
        password: secPass,
        location: location,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const userId = data.user.id.toString();
      // console.log(userId);
      const authtoken = jwt.sign(data, JWT_SECRET);

      await sendEmail(email, "VERIFY", userId);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: true });
    }
  }
);

router.post(
  "/loginuser",
  body("email", "Email should be xyz@mail.com").isEmail(),
  body("password", "Password is not matching").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Try loggin with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Try loggin with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authtoken, email });
    } catch (error) {
      console.log(error);
      res.json({ success: true });
    }
  }
);

router.post("/verifyForgetPassword", async (req, res) => {
  try {
    const reqBody = await req.body;
    const { token, newPassword } = reqBody;
    // console.log(token);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    // console.log(user);
    if (!user) {
      return res.json({ error: "Invalid token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return res.json({ message: "Email verified successfully" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

router.post("/verifyEmail", async (req, res) => {
  try {
    const reqBody = await req.body;
    const { token } = reqBody;
    // console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ error: "Invalid token" });
    }

    // console.log(user);

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

module.exports = router;
