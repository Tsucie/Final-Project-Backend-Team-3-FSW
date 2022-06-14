const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */

// Cars
apiRouter.get("/api/v1/cars", controllers.api.v1.carController.list);

apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);
apiRouter.post("/api/v1/auth/google", controllers.api.v1.authController.google);

apiRouter.get("/api/v1/whoami", controllers.api.v1.authController.whoAmI);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
