const express = require("express");
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

//Analyze a news
router.post("/", async (req, res) => {
  const { title, news, imageURL, date, time, inshortslink } = req.body;
  const analyzeParams = {
    url: inshortslink,
    features: {
      entities: {
        limit: 3,
        sentiment: true,
        relevance: true,
        count: true,
      },
      keywords: {
        sentiment: true,
        emotion: true,
        limit: 3,
      },
    },
  };

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      let entities = analysisResults.result.entities;
      let keywords = analysisResults.result.keywords;
      let result = {
        entities,
        keywords,
        title,
        news,
        imageURL,
        date,
        time,
        inshortslink,
      };
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
        errmsg: err.toString(),
      });
    });
});

module.exports = router;
