module.exports = app => {
    const claim_tokens = require("../controllers/claim_token.controller.js");
    var router = require("express").Router();
    router.post("/", claim_tokens.get);
    app.use("/api/claim_tokens", router);
  };