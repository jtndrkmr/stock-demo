const getStockPipeline = (offset, limit) => {
  const getPipeline = [
    {
      $sort: {
        Date: -1,
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: limit,
    },
    {
        $project: {__v: 0}
    }
  ];

  const countPipeline = [
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        count: "$count"
      },
    },
  ];

  return [
    {
      $facet: {
        stocks: getPipeline,
        count: countPipeline,
      },
    },
  ];
};

module.exports = {
  getStockPipeline,
};
