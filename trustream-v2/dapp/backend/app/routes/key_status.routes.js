module.exports = (app) => {
  const key_status = require('../controllers/key_status.controller.js')
  const { check_admin_auth } = require("../midldewares");

  var router = require('express').Router()

  router.get('/setting/getlist',            key_status.getSettingList)
  router.post('/setting/get',               key_status.getServerSettings)
  router.post('/setting/getvaluelist',      key_status.getServerSettingList)
  router.post('/setting/update',            check_admin_auth,       key_status.updateServerSettings)

  app.use('/api/key_status', router)
}