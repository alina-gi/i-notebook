const User = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = "Harryisagoodboy";
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1 CREAT A USER
router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'Password must be 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry user already exist" })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    const data = {
      user: {
        id: user.id
      }}
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({ authToken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured")
  }
})

// ROUTE 2 Authenticate a user
router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // if there are errors return errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Something is wrong in email or password." })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Something is wrong in email or password." })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({ authToken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }

})

// ROUTE 3 GET USER
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findOne({userId}).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }

})
module.exports = router;