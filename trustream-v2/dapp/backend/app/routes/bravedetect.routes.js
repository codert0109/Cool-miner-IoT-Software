module.exports = (app) => {
    const detector = require('../controllers/bravedetect.controller.js')
  
    var router = require('express').Router()
    
    router.get('/set', detector.setCookie)
    router.post('/check', detector.checkCookie)
    app.use('/api/detect/cookie',  router)
  }