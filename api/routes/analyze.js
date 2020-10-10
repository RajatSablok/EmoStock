const express = require("express");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

require("dotenv").config();

const companies = require("../../assets/companies.json");

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

      //Store entities of type company in entitiesArr
      for (i in entities) {
        if (entities[i].type == "Company") {
          entitiesArr.push(entities[i]);
        }
      }

      //Map company name with stock
      for (i in companies) {
        for (j in entitiesArr) {
          if (
            companies[i]["Company Name"].includes(entitiesArr[j].text) ||
            companies[i]["Symbol"].includes(entitiesArr[j].text)
          ) {
            companyArr.push(companies[i]);
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

//Analyze all news
router.post("/all", async (req, res) => {
  let entitiesArr = [];
  let companyArr = [];

  const analyzeParams = {
    url: "https://inshorts.com/en/read/business",
    features: {
      entities: {
        limit: 200,
        sentiment: true,
      },
    },
  };

  //Analyze news
  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      const entities = analysisResults.result.entities;
      for (i in entities) {
        if (entities[i].type == "Company" && entities[i].sentiment.score != 0) {
          entitiesArr.push(entities[i]);
        }
      }

      for (i in companies) {
        for (j in entitiesArr) {
          if (
            companies[i]["Company Name"].includes(entitiesArr[j].text) ||
            companies[i]["Symbol"].includes(entitiesArr[j].text)
          ) {
            let obj = {};
            obj.companyName = companies[i]["Company Name"];
            obj.symbol = companies[i]["Symbol"];
            obj.sentiment = entitiesArr[j].sentiment;
            companyArr.push(obj);
          }
        }
      }

      res.status(200).json({
        companies: companyArr,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.toString(),
      });
    });
});

module.exports = router;
