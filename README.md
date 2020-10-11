# EmoStock

> <Subtitle>
> Your one-stop solution to profitable stocks :chart_with_upwards_trend:

---

[![DOCS](https://img.shields.io/badge/Documentation-see%20docs-green?style=flat-square&logo=appveyor)](https://documenter.getpostman.com/view/12931122/TVRkYSPq)

## Features

- Get latest business news
- Relate news with stocks and find the best stocks to invest in
- Analyze financial reports of companies
- Easily track stocks of varous companies; get notified when they are predicted to rise or fall
- Get information for any stock listed in NSE or BSE

## Instructions to run

```
$ git clone https://github.com/RajatSablok/EmoStock.git
$ cd EmoStock
$ npm install
```

These variables should reside as key value pairs in a file called `.env`.

|               Variable Name               |                Description                |          Get it from          |
| :---------------------------------------: | :---------------------------------------: | :---------------------------: |
|   NATURAL_LANGUAGE_UNDERSTANDING_APIKEY   |            IBM Watson API KEY             |    https://cloud.ibm.com/     |
| NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY |          IBM Watson IAM API KEY           |    https://cloud.ibm.com/     |
|    NATURAL_LANGUAGE_UNDERSTANDING_URL     |        IBM Watson NLU Service URL         |    https://cloud.ibm.com/     |
| NATURAL_LANGUAGE_UNDERSTANDING_AUTH_TYPE  |         IBM Watson NLU Auth Type          |    https://cloud.ibm.com/     |
|                NEWS_APIKEY                |              NEWSAPI API KEY              |  https://newsapi.org/account  |
|                   DBURI                   |    URI for connecting to MongoDB Atlas    |  https://cloud.mongodb.com/   |
|                JWT_SECRET                 |              JWT Secret Key               | You can generate your own key |
|             SENDGRID_API_KEY              |             Sendgrid API KEY              |   https://app.sendgrid.com/   |
|              SENDGRID_EMAIL               | Email for sending out mails from Sendgrid |   https://app.sendgrid.com/   |

```
$ npm start
```

## Contributors

- <a href="https://github.com/RajatSablok">Rajat Sablok</a>

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
