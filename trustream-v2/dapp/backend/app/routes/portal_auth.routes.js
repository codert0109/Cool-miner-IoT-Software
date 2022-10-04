module.exports = app => {
  const portal_auth = require("../controllers/portal_auth.controller.js");

  var router = require("express").Router();

  router.post("/getNounce",   portal_auth.getNounce);
  router.post("/login",       portal_auth.login);
  router.post("/verify",      portal_auth.verify);

  app.use("/api/portal_auth", router);
};