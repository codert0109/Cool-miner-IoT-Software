module.exports = (app) => {
  const profile = require('../controllers/profile.controller.js')

  var router = require('express').Router()

  router.post('/update', profile.updateEmail)

  app.use('/api/profile', router)
}
