const db = require("../models");
const Device_Data = db.device_datas;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  let offset = req.query.offset;
  let limit = req.query.limit;

  // Validation of Limit
  if (limit == null) limit = 100;
  limit = parseInt(limit);
  if (limit > 100) limit = 100;

  // Validation of Offset
  if (offset == null) offset = 0;
  offset = parseInt(offset);
  if (offset < 0) offset = 0;

  Device_Data.count()
    .then(cnt => {
      Device_Data.findAll({offset, limit, order: [['timestamp', 'DESC']]})
        .then(data => {
          res.send({
            offset,
            cnt : limit,
            totcnt : cnt,
            data
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving device_datas."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting device_datas."
      });
    })
};