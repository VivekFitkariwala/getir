export function getAgg(
  minCount: number,
  maxCount: number,
  startDate: Date,
  endDate: Date
) {
  return [
    {
      $project: {
        _id: 1,
        key: 1,
        value: 1,
        createdAt: 1,
        counts: 1,
        sum: {
          $sum: "$counts",
        },
      },
    },
    {
      $match: {
        $and: [
          {
            $expr: {
              $gt: ["$sum", minCount],
            },
          },
          {
            $expr: {
              $lt: ["$sum", maxCount],
            },
          },
          {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        ],
      },
    },
    {
      $project: {
        sum: 0,
      },
    },
  ];
}
