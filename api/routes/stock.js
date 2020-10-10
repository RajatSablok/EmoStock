const express = require("express");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

require("dotenv").config();

const companies = require("../../assets/companies.json");
const User = require("../models/user");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2020-08-01",
  authenticator: new IamAuthenticator({
    apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_APIKEY,
  }),
  serviceUrl: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
});

//Get all companies on NSE and BSE
router.get("/allCompanies", async (req, res) => {
  res.status(200).json(companies);
});

//Track a stock
router.post("/track", checkAuth, async (req, res, next) => {
  const { userId } = req.user;
  const { companyName, symbol } = req.body;

  if (!companyName || !companyName) {
    return res.status(400).json({
      message: "1 or more parameter(s) missing from req.body",
    });
  }

  await User.updateOne(
    { _id: userId },
    { $push: { tracking: { companyName, symbol } } }
  )
    .then(() => {
      res.status(200).json({
        message: "Tracker successfully added",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//Get all stocks a user is tracking
router.get("/user/tracking", checkAuth, async (req, res, next) => {
  const { userId } = req.user;

  await User.findById(userId)
    .then(async (user) => {
      res.status(200).json({
        tracking: user.tracking,
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
