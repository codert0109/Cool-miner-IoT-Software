module.exports = app => {
  const device_data = require("../controllers/device_data.controller.js");
  const { check_admin_auth } = require("../midldewares");

  var router = require("express").Router();

  // Create a new Tutorial
  // router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/",               device_data.findAll);
  router.get("/isActive",       device_data.isActive);
  router.get("/clean",         check_admin_auth,   device_data.clean);

  // router.post("/getUploadCnt",  device_data.getUploadCnt);

  // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  app.use("/api/device_status", router);
};
