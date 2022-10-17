module.exports = (app) => {
  require('./device_data.routes')(app)
  require('./portal_auth.routes')(app)
  require('./device_uptime.routes')(app)
  require('./claim_token.routes')(app)
  require('./server_status.routes')(app)
  require('./server_update.routes')(app)
  require('./nft_auth.routes')(app)
  require('./staking.routes')(app)
  require('./camera.routes')(app)
  require('./email.routes')(app)
}
