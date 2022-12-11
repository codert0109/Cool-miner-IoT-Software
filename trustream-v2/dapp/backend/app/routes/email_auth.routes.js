module.exports = (app) => {
  const email_auth = require('../controllers/email_auth.controller.js')

  var router = require('express').Router()

  router.post('/verify', email_auth.verifyEmail)

  app.use('/api/email_auth', router)
}