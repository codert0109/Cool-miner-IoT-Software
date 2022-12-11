module.exports = (app) => {
  const profile = require('../controllers/profile.controller.js')
  const { check_auth } = require("../midldewares");

  var router = require('express').Router()

  router.post('/get',             check_auth, profile.getProfile)
  router.post('/updateEmail',     check_auth, profile.updateEmail)
  router.post('/updateSetting',   check_auth, profile.updateSetting)

  app.use('/api/profile', router)
}
