const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();
const authorize = require('../utilities/authorize');

/**
 * TODO: Implement your own API
 *       implementations
 */

// Global Routes
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);
apiRouter.post("/api/v1/auth/google", controllers.api.v1.authController.google);
apiRouter.get("/api/v1/productCategories", controllers.api.v1.productCategoryController.getAll);
apiRouter.get("/api/v1/productCategories/:id", controllers.api.v1.productCategoryController.getById);

// Authorized Routes (All)
apiRouter.get("/api/v1/whoami", authorize.all, controllers.api.v1.authController.whoAmI);

// Authorized Routes (Seller)
apiRouter.post("/api/v1/productCategories", authorize.seller, controllers.api.v1.productCategoryController.create);
apiRouter.put("/api/v1/productCategories/:id", authorize.seller, controllers.api.v1.productCategoryController.update);
apiRouter.delete("/api/v1/productCategories/:id", authorize.seller, controllers.api.v1.productCategoryController.delete);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
