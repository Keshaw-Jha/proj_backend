const SignIn = require(`../models/signInModel`);
const { v4: uuidv4 } = require("uuid");

const findUser = async (userObj) => {
  try {
    const user = await SignIn.findOne(userObj);
    return user;
  } catch (err) {
    throw new Error("Database error");
  }
};

const signInUser = async (req, res) => {
  try {
    const signInObj = { ...req.body, userId: uuidv4() };
    const isExisting = await findUser({
      name: signInObj.name,
      password: signInObj.password,
    });
    if (!!isExisting) {
      return res
        .status(200)
        .json({ status: "invalid", message: "already existing User" });
    }
    const userObj = await SignIn.create(signInObj);
    const { password, ...userData } = { ...userObj._doc };
    res.status(201).json({
      status: "success",
      data: userData,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err,
    });
  }
};

const logInUser = (req, res) => {
  const logInObj = { ...req.body };

  findUser({
    email: logInObj.email,
    password: logInObj.password,
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found" });
      }

      const { password, ...userData } = user.toObject();
      return res.status(200).json({
        status: "success",
        data: userData,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "failed",
        error: err.message,
      });
    });
};

module.exports = { signInUser, logInUser };
