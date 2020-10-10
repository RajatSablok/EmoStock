const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const companies = require("../../assets/companies.json");

const User = require("../models/user");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

//Get all companies on NSE and BSE
router.get("/allCompanies", async (req, res) => {
  res.status(200).json(companies);
});

module.exports = router;
