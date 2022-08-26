module.exports = app => {
  const server_status = require("../controllers/server_status.controller.js");

  var router = require("express").Router();
  
  router.get("/servers",  server_status.getServers);

  app.use("/api/status", router);
};
