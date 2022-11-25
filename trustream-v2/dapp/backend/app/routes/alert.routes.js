module.exports = (app) => {
  const alert = require('../controllers/alert.controller.js')

  var router = require('express').Router()

  router.post('/get', alert.getAlert)

  app.use('/api/alert', router)
}