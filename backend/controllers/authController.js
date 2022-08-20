const User = require("../model/User");
const Employee = require("../model/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req?.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "username and password are required." });
  }
  if (!req?.params?.type) {
    return res.status(400).json({ message: "type parameter missing" });
  }
  const type = req.params.type;
  let foundUser;
  if (type === "user") {
    foundUser = await User.findOne({ username: user }).exec();
  } else if (type === "employee") {
    foundUser = await Employee.findOne({ username: user }).exec();
  } else {
    return res.status(400).json({ message: "not accepteble type parameter" });
  }

  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id,
          roles: roles,
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, roles, id: foundUser._id });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { handleLogin };
