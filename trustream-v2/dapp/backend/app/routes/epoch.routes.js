module.exports = app => {
    const epoch = require("../controllers/epoch.controller.js");

    var router = require("express").Router();

    router.get("/status",                epoch.getStatus);

    app.use("/api/epoch", router);
};