const express = require("express");
const homeRouter = express.Router();
const alphaApiKey = process.env.ALPHA_VANTAGE_API_KEY

// homeRouter.get('/', (req, res) => {
//     // res.send(alphaApiKey)
// })

module.exports = homeRouter
