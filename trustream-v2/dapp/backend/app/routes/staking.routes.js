module.exports = app => {
    const staking_controller = require("../controllers/staking.controller.js");
  
    var router = require("express").Router();
    
    router.get("/getparam",  staking_controller.getStakingParameters);  
    app.use("/api/staking", router);
  };