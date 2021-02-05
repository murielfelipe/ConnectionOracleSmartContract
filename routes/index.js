var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/',  async function(req, res, next) {
  let stock = {};
  const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo');
  const rawstocks = await response.json();
  stock.price =  rawstocks['Global Quote']['05. price'];
  stock.volume =  rawstocks['Global Quote']['06. volume'];
  console.log(stock);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(stock));

});

module.exports = router;
