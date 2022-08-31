module.exports = app => {
  const server_update = require("../controllers/server_update.controller.js");

  var router = require("express").Router();
  
  router.get("",  server_update.getUpdate);

  app.use("/update", router);
};
