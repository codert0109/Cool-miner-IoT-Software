const express = require('express')
const cors = require('cors')

const app = express()
const http = require('http')
const https = require('https')
const fs = require('fs')
const cookieParser = require('cookie-parser');

function ensureSecure(req, res, next) {
  // return next() // for testing purpose

  if (req.secure) {
    // OK, continue
    return next()
  }

  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://' + 'miner.elumicate.com' + req.url) // express 4.x
}

app.all('*', ensureSecure)
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const db = require('./app/models')

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
    // register micro service
    require('./app/services/claim.service').init();
    require('./app/services/alert.service').init();
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// register routes
require('./app/routes')(app)



https
  .createServer(
    {
      ca: fs.readFileSync('cert/ca.crt'),
      key: fs.readFileSync('cert/privatekey.pem'),
      cert: fs.readFileSync('cert/server.crt'),
    },
    app,
  )
  .listen(3333, function () {
    console.log(
      'HTTPS Server is running on port 3333! Go to https://localhost:3333/',
    )
  })

http.createServer(app).listen(3334)