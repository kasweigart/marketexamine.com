const express = require("express");
const marketsRouter = express.Router();
const axios = require("axios");
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;


marketsRouter.get("/api", (req, res) => {
  axios
    .get(`https://www.alphavantage.co/query?function=SECTOR&apikey=${apiKey}`)
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
});

module.exports = marketsRouter;
