const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const NewsAPI = require("newsapi");

require("dotenv").config();

const router = express.Router();

const newsapi = new NewsAPI(process.env.NEWS_APIKEY);

//Get all business news
router.get("/all", (req, res, next) => {
  request("https://inshorts.com/en/read/business", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      var titleArray = [];
      var contentArray = [];
      var inshortsData = {};
      var title;
      var content;
      var resultObj = [];
      var image = [];
      var time = [];
      var date = [];
      var links = [];
      var inlinks = [];

      const $ = cheerio.load(html);

      $(".card-stack").each((i, el) => {
        title = $(el).find(".news-card-title a").find("span").text();

        titleArray = title.split("short");

        titleArray.splice(-1, 1);

        content = $(el)
          .find(".news-card-content")
          .find("div")
          .text()
          .trim()
          .replace(/short by .+\s\s+.+/gm, "ezpz")
          .trim();

        contentArray = content.split("ezpz");

        contentArray.splice(-1, 1);

        for (var i = 0; i < contentArray.length; i++) {
          contentArray[i] = contentArray[i].trim();
        }
      });

      $("[class='news-card-image']").each(function (i, elem) {
        var bg = $(this).css("background-image");
        image[i] = bg
          .replace(/.*\s?url\([\'\"]?/, "")
          .replace(/[\'\"]?\).*/, "");
      });

      $("[itemprop='datePublished']").each(function (i, elem) {
        time[i] = $(this).text();
      });

      $("[class='date']").each(function (i, elem) {
        date[i] = $(this).text();
      });

      $("a[class='clickable']").each(function (i, elem) {
        inlinks[i] = $(this).attr("href");
      });

      $("a[class='source']").each(function (i, elem) {
        links[i] = $(this).attr("href");
      });

      for (var i = 0; i < titleArray.length; i++) {
        resultObj.push({
          title: titleArray[i],
          news: contentArray[i],
          imageURL: image[i],
          date: date[i],
          time: time[i],
          inshortslink: "https://inshorts.com" + inlinks[i],
        });
      }

      inshortsData = { data: resultObj };

      res.status(200).json({
        language: "English",
        category: "Business",
        news: inshortsData,
      });
    } else {
      res.status(500).json({
        error: error,
      });
    }
  });
});

//Get news by keyword -- related news
router.get("/", async (req, res) => {
  const { keyword } = req.query;
  newsapi.v2
    .topHeadlines({
      q: keyword,
      category: "business",
      language: "en",
      country: "in",
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

module.exports = router;
