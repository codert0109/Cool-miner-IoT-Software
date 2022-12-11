module.exports = (app) => {
  const camera = require('../controllers/camera.controller.js')
  const { check_admin_auth } = require("../midldewares");

  var router = require('express').Router()
  
  router.post('/add',       check_admin_auth, camera.onAdd)
  router.post('/addList',   check_admin_auth, camera.onAddList)
  router.get('/get',                        camera.onGet)
  router.post('/update',    check_admin_auth, camera.onUpdate)
  router.post('/remove',    check_admin_auth, camera.onRemove)
  app.use('/api/cameras/',  router)
}