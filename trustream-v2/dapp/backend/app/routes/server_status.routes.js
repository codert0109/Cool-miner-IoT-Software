module.exports = app => {
  const server_status = require("../controllers/server_status.controller.js");
  const { check_admin_auth } = require("../midldewares");

  var router = require("express").Router();
  
  router.get("/servers",                server_status.getServers);
  router.get("/getRequiredVersion",     server_status.getRequiredVersion);
  router.post("/setRequiredVersion",    check_admin_auth, server_status.setRequiredVersion);

  app.use("/api/status", router);
  
};
