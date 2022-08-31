module.exports = app => {
  const server_update = require("../controllers/server_update.controller.js");

  var router = require("express").Router();
  
  router.get("",  server_update.getUpdate);
  router.post("/create",  server_update.createUpdate);

  app.use("/update", router);
};
