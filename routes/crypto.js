const express = require("express");
const cryptoRouter = express.Router();
const axios = require("axios");
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

cryptoRouter.get("/api", (req, res) => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey=${apiKey}`
    )
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
});


cryptoRouter.post("/api", (req, res) => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=${req.body.cryptoSymbol}&apikey=${apiKey}`
    )
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
});


module.exports = cryptoRouter;
