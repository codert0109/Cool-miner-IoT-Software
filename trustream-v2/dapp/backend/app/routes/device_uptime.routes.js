module.exports = app => {
  const device_uptime = require("../controllers/device_uptime.controller.js");

  var router = require("express").Router();
  
  router.post("/getUpTime",  device_uptime.getUpTime);

  app.use("/api/device_uptime", router);
};
