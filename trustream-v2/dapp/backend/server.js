const express = require("express");
const cors = require("cors");

const app = express();
const https = require("https");
const fs = require("fs");

app.use(express.static('public'))

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Elumicate dApp application." });
});

require("./app/routes/device_data.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3333;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

https
  .createServer(
    {
      key: fs.readFileSync("cert/privatekey.pem"),
      cert: fs.readFileSync("cert/server.crt"),
    },
    app
  )
  .listen(3333, function () {
    console.log(
      "Example app listening on port 3333! Go to https://localhost:3333/"
    );
  });


/* Redirecting Function implemented*/

function redirectMiddleware(req, res, next) {
  // res.redirect('https://miner.elumicate.com');
  res.send('Redirecting');
}

const http_server = express();
http_server.listen(3334, () => {
  console.log('http_server opened 3334 port to redirect.');
});

http_server.use(redirectMiddleware);