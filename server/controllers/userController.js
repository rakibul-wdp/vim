const User = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  console.log(email, user)
  const hash = await argon2.hash(password);
  try {
    if (user) {
      return res.status(400).send("user already exists")
    } else {
      const newUser = new User({ email, password: hash, name });
      await newUser.save();
      res.status(201).send({ message: "user created successfully", "user": newUser })
    }
  }
  catch (e) {
    console.log(e.message)
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (await argon2.verify(user.password, password)) {
    const token = jwt.sign({
      ...user
    }, "rakibuldobby", {
      expiresIn: "7 days"
    })
    return res.send({ message: "Login successful", token, user: user })
  };
  res.status(401).send("Invalid Credential")
}