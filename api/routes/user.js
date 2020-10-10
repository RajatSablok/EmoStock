const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const User = require("../models/user");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

//User signup
router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "1 or more parameter(s) missing from req.body",
    });
  }

  await User.find({ email })
    .then(async (user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }

      await bcrypt
        .hash(password, 10)
        .then(async (hash) => {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hash,
          });

          await user
            .save()
            .then(async (result) => {
              const token = jwt.sign(
                {
                  userId: result._id,
                  email: result.email,
                  name: result.name,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "30d",
                }
              );
              res.status(201).json({
                message: "User created",
                user: {
                  _id: result._id,
                  name: result.name,
                  email: result.email,
                },
                token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Something went wrong",
                error: err.toString(),
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
            error: err.toString(),
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//User login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "1 or more parameter(s) missing from req.body",
    });
  }

  await User.find({ email })
    .then(async (user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed: Email not found",
        });
      }
      await bcrypt
        .compare(password, user[0].password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              {
                userId: user[0]._id,
                email: user[0].email,
                name: user[0].name,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "30d",
              }
            );
            return res.status(200).json({
              userDetails: {
                _id: user[0]._id,
                name: user[0].name,
                email: user[0].email,
              },
              token,
            });
          }
          return res.status(401).json({
            message: "Auth failed: Invalid password",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
            error: err.toString(),
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

module.exports = router;
