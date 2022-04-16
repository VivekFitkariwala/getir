/**
 * 
 * @param {number} minCount - Minimum count
 * @param {number} maxCount - Maximum count
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns 
 */
export function getAgg(
  minCount: number,
  maxCount: number,
  startDate: Date,
  endDate: Date
) {
  return [
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: {
          $sum: "$counts",
        },
      },
    },
    {
      $match: {
        $and: [
          {
            $expr: {
              $gt: ["$totalCount", minCount],
            },
          },
          {
            $expr: {
              $lt: ["$totalCount", maxCount],
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
    }
  ];
}
