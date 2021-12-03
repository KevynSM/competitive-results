module.exports = app => {
    const controller = require("../controllers/controller");
    
    const router = require("express").Router();

    router.post("/login", controller.login);

    router.post("/register", controller.register);

    app.use("/", router);
}