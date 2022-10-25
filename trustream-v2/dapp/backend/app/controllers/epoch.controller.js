const db = require('../models')
const Epoch = db.epochs
const { getValue } = require('./key_status.controller')

exports.getStatus = (req, res) => {
  getValue('LAST_UPDATED_EPOCH')
    .then((data) => {
      if (data == null) {
        res.send({
          status: 'OK',
          message: 'Bad request',
        })
        return
      }
      Epoch.findOne({ where: { epoch: data.value } })
        .then((data) => {
          if (data == null) {
            res.send({
              status: 'OK',
              message: 'Empty Data',
            })
            return;
          }
          res.send({
            status: 'OK',
            data,
          })
        })
        .catch((err) => {
          console.error(err)
          res.send({
            status: 'ERR',
            message: 'Internal Server Error',
          })
          return
        })
    })
    .catch((err) => {
      console.error(err)
      res.send({
        status: 'ERR',
        message: 'Internal Server Error',
      })
    })
}
