const express = require("express");
const newsRouter = express.Router();
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWS_API_KEY)

newsRouter.get('/api', (req, res) => {
    newsapi.v2.topHeadlines({
        q: 'stocks'
      }).then(response => {
        res.send(response)
      });
})

module.exports = newsRouter
