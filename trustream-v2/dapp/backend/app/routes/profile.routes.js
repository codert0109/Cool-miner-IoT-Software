module.exports = (app) => {
  const profile = require('../controllers/profile.controller.js')
  const { check_auth } = require("../midldewares");

  var router = require('express').Router()

  router.post('/get',     check_auth, profile.getProfile)
  router.post('/update',  check_auth, profile.updateEmail)

  app.use('/api/profile', router)
}
