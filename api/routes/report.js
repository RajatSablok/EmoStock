const express = require("express");
const path = require("path");
const pdf = require("pdf-parse");
const multer = require("multer");

const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

require("dotenv").config();

const router = express.Router();

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2020-08-01",
  authenticator: new IamAuthenticator({
    apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_APIKEY,
  }),
  serviceUrl: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
});

router.post("/", async (req, res) => {
  //Upload pdf using multer
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        error: "PLease select correct file",
      });
    } else if (err) {
      return res.status(500).json({
        message: "Something went wrong",
        error: err,
        errormsg: err.toString(),
      });
    }
    //Define the filepath for reading file
    const filepath =
      path.dirname(__dirname).replace("\\api", "").replace("/api", "") +
      "/public/uploads/" +
      req.file.filename;

    //Parse pdf to text
    pdf(filepath).then(function (data) {
      //Define parameters for analyzing file
      const analyzeParams = {
        text: data.text,
        features: {
          sentiment: {},
        },
      };

      //Perform sentiment analysis on the document
      naturalLanguageUnderstanding
        .analyze(analyzeParams)
        .then((analysisResults) => {
          res.status(200).json(analysisResults, null, 2);
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
            error: err,
            errmsg: err.toString(),
          });
        });
    });
  });
});

//Storage function for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

//Upload function for multer
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  onError: function (err, next) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
      errormsg: err.toString(),
    });
    next(err);
  },
}).single("file");

//Add filefilter for multer

module.exports = router;
