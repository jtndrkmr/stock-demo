const csv = require("csv-parser");
const fs = require("fs");
const stockModel = require("../models/stocks");

const storeDataCsvToDb = async () => {
  let csvData = [];
  let isDataAvailInDb = await checkStockInDb();
  if (isDataAvailInDb) return;
  fs.createReadStream(__dirname + "/Sensex_CSV_2018CSVForDate.csv")
    .pipe(csv({}))
    .on("data", ({ Date, Open, Close }) => {
      csvData.push({ Date, Open, Close });
    })
    .on("end", async () => {
      await stockModel.insertMany(csvData);
      console.log("Data inserted in DB Completed!");
    });
};

const checkStockInDb = async () => {
  return stockModel.find({}).countDocuments();
};

module.exports = {
  storeDataCsvToDb,
};
