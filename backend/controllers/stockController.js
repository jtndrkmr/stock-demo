const stockModel = require("../models/stocks");
const { getStockPipeline } = require("../monoosePipelines");
const getStocks = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    let pipeline = getStockPipeline(offset, limit);
    let stocks = await stockModel.aggregate(pipeline);
    res.json({
      status: true,
      message: "Stock data is fetching successfully!",
      data: stocks[0],
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error during fetching stocks data",
      data: [],
    });
  }
};

const addStocks = async (req, res) => {
  try {
    let { Open, Close } = req.body;
    if (Open && Close) {
      // insert data into db..
      await stockModel.create({Open, Close});
      return res.json({
        status: true,
        message: 'Data inserted successfully!'
      }).status(201);
    } else {
      throw new Error("Fields are required!");
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: [],
    });
  }
};

const getPagination = (page, size) => {
  const limit = size ? +size : 30;
  const offset = page ? +page * limit : 0;
  return { limit, offset };
};

module.exports = {
  getStocks,
  addStocks,
};
