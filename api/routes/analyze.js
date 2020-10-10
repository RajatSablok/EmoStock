const express = require("express");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

require("dotenv").config();

const countries = require("../../assets/companies.json");

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
  let companyArr = [];
  let entitiesArr = [];

  //Define parameters for analyzing news
  const analyzeParams = {
    url: inshortslink,
    features: {
      entities: {
        limit: 3,
        sentiment: true,
        relevance: true,
        count: true,
      },
    },
  };

  //Analyze news
  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      let entities = analysisResults.result.entities;

      //Store entities of type company in entititesArr
      for (i in entities) {
        if (entities[i].type == "Company") {
          entitiesArr.push(entities[i]);
        }
      }

      //Map company name with stock
      for (i in countries) {
        for (j in entitiesArr) {
          if (
            countries[i]["Company Name"].includes(entitiesArr[j].text) ||
            countries[i]["Symbol"].includes(entitiesArr[j].text)
          ) {
            companyArr.push(countries[i]);
          }
        }
      }

      //Define result object
      let result = {
        entities: entitiesArr,
        companyArr,
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
