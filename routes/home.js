const express = require("express");
const homeRouter = express.Router();
const axios = require("axios");
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

homeRouter.get("/api", (req, res) => {
  axios
    .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=VOO&outputsize=compact&apikey=${apiKey}`)
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
});

homeRouter.post("/api/price", (req, res) => {
    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.body.stockSymbol}&outputsize=compact&apikey=${apiKey}`)
      .then(function (response) {
          res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  });

  homeRouter.get("/api/sma", (req, res) => {
    axios
      .get(`https://www.alphavantage.co/query?function=SMA&symbol=VOO&interval=daily&time_period=20&series_type=close&apikey=${apiKey}`)
      .then(function (response) {
          res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  });

  homeRouter.post("/api/sma", (req, res) => {
    axios
      .get(`https://www.alphavantage.co/query?function=SMA&symbol=${req.body.stockSymbol}&interval=daily&time_period=20&series_type=close&apikey=${apiKey}`)
      .then(function (response) {
          res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  });

  homeRouter.get("/api/ema", (req, res) => {
    axios
      .get(`https://www.alphavantage.co/query?function=EMA&symbol=VOO&interval=daily&time_period=20&series_type=close&apikey=${apiKey}`)
      .then(function (response) {
          res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  });

  homeRouter.post("/api/ema", (req, res) => {
    axios
      .get(`https://www.alphavantage.co/query?function=EMA&symbol=${req.body.stockSymbol}&interval=daily&time_period=20&series_type=close&apikey=${apiKey}`)
      .then(function (response) {
          res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  });

module.exports = homeRouter;
