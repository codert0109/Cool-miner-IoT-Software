module.exports = app => {
  const server_update = require("../controllers/server_update.controller.js");
  const { check_admin_auth } = require("../midldewares");

  var router = require("express").Router();
  
  router.get("",  server_update.getUpdate);

  router.post("/create",  check_admin_auth, server_update.createUpdate);

  app.use("/update", router);
};
