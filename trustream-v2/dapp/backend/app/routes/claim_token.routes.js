module.exports = (app) => {
  const claim_tokens = require('../controllers/claim_token.controller.js')
  
  var router = require('express').Router()
  router.post('/', claim_tokens.get)
  router.post('/claimReward', claim_tokens.claimReward)
  router.post('/getInfo', claim_tokens.getInfo)

  app.use('/api/claim_tokens', router)
}
