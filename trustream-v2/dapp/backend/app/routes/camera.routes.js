module.exports = (app) => {
  const camera = require('../controllers/camera.controller.js')
  var router = require('express').Router()
  router.post('/add', camera.onAdd)
  router.get('/get', camera.onGet)
  router.post('/update', camera.onUpdate)
  router.post('/remove', camera.onRemove)
  app.use('/api/cameras/', router)
}