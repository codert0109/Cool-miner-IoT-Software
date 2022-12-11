module.exports = app => {
  const device_data = require("../controllers/device_data.controller.js");
  const { check_admin_auth } = require("../midldewares");

  var router = require("express").Router();
  
  router.get("/",                     device_data.findAll);
  router.get("/isActive",             device_data.isActive);
  router.get("/clean",                check_admin_auth,   device_data.clean);
  router.post("/getActiveMiner",      device_data.getActiveMiner);
  router.post("/getActiveMinerCnt",   device_data.getTotActiveMinerCnt);
  

  app.use("/api/device_status", router);
};