module.exports = app => {
  const device_auth = require("../controllers/device_auth.controller.js");

  var router = require("express").Router();

  router.post("/getNounce", device_auth.getNounce);
  router.post("/login",     device_auth.login);

  app.use("/api/device_auth", router);
};