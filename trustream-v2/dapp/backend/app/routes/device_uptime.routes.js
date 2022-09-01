module.exports = app => {
  const device_uptime = require("../controllers/device_uptime.controller.js");
  const { check_admin_auth } = require("../midldewares");

  var router = require("express").Router();
  
  router.post("/getUpTime",  device_uptime.getUpTime);
  router.post("/fixUpTime",  check_admin_auth, device_uptime.fixUpTime);

  app.use("/api/device_uptime", router);
};
