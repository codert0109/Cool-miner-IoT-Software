module.exports = (app) => {
  const camera = require('../controllers/camera.controller.js')
  const { check_auth } = require("../midldewares");

  var router = require('express').Router()
  
  router.post('/add',     check_auth, camera.onAdd)
  router.get('/get',                  camera.onGet)
  router.post('/update',  check_auth, camera.onUpdate)
  router.post('/remove',  check_auth, camera.onRemove)
  app.use('/api/cameras/', router)
}