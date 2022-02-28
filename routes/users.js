const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require('../models/user_db');
const auth = require('../middleware/auth');
const mongoose = require("mongoose");


//USER SIGNUP
router.post('/signup', [
  check("name", "Please Enter a name"),
  check("age", "Please Enter age"),
  check("email", "Please enter a valid email").isEmail(),
  check("address", "Please Enter address"),
  check("password", "Please enter a valid password").isLength({
    min: 6
  }),
  check("isAdmin"),
  check("isSeller")
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { name, age, email, address, password, isAdmin, isSeller } = req.body;

  try {
    let user = await User.findOne({
      email
    });
    if (user) {
      return res.status(400).json({
        msg: "USER ALREADY EXIST"
      });
    }

    user = new User({
      name,
      age,
      email,
      address,
      password,
      isAdmin,
      isSeller
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };


    jwt.sign(
      payload,
      "randomString",
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error is Saving");
  }
});

//Login - Generates a token which can be used to get the details (in '/me' router)
router.post('/login', [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  })
],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password!"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        (err, token) => {
          if (err) throw err;
          return res.json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

//Get user detail by passing the generated token in the Header.
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  }
  catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

//Get details of all the user
router.get('/all', async (req, res) => {
  try {
    const get_all = await User.find();
    res.send(get_all);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }

});


//delete User details with the help of id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.send("No Such User Exists");
  }
  await User.findByIdAndRemove(id);
  res.send('DONE');
});


//Updating details of the user
router.put('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.isSeller = Boolean(req.body.isSeller);
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.send({message:'User Updated', user:updatedUser});
  }
  else{
    return res.status(404).send({message:'User Not Found'});
  }
});


module.exports = router;