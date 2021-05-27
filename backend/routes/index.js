const express = require("express");
const router = express.Router();
const { getStocks, addStocks } = require("../controllers/stockController");

router.get("/stocks", getStocks);
router.post("/stocks", addStocks);


module.exports = router;
