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
  const { url } = req.body;
  const analyzeParams = {
    url,
    features: {
      entities: {
        limit: 5,
        sentiment: true,
        relevance: true,
        count: true,
        mentions: false,
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
      };
      res.status(200).json(result, null, 2);
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
