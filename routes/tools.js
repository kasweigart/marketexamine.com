const express = require("express");
const toolsRouter = express.Router();
const axios = require("axios");
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;


toolsRouter.post("/api", (req, res) => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${req.body.firstCurr}&to_currency=${req.body.secondCurr}&apikey=${apiKey}`
    )
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
});


module.exports = toolsRouter;
