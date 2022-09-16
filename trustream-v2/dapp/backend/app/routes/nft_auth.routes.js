module.exports = app => {
  const nft_auth = require("../controllers/nft_auth.controller.js");
  const { check_auth } = require("../midldewares");

  var router = require("express").Router();

  router.post("/status",                nft_auth.getStatus);
  router.post("/create",                check_auth,   nft_auth.create);
  router.post("/remove",                check_auth,   nft_auth.remove);
  router.post("/verify",                nft_auth.verify);
  router.post("/verifySignature",       nft_auth.verifySignature);

  app.use("/api/nft_auth", router);
};