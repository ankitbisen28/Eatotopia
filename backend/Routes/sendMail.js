const sendEmail = require("../Helper/sendMail.js");
const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");

router.post("/forgetPasswordMail", async (req, res) => {
  try {
    const reqBody = await req.body;
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "User Does not exist" }, { status: 400 });
    }

    const userId = user._id.toString();
    await sendEmail(email, "RESET", userId);

    return res.json({ message: "Forgot password email sent" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

module.exports = router;
