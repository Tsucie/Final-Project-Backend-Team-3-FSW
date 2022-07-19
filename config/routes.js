const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();
const authorize = require("../utilities/authorize");
const upload = require("./upload");
const cors = require("cors");
apiRouter.use(cors());
/**
 * TODO: Implement your own API
 *       implementations
 */

// Global Routes
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);
apiRouter.post("/api/v1/auth/google", controllers.api.v1.authController.google);
apiRouter.delete("/api/v1/delete/:email", controllers.api.v1.userController.deleteUser);
apiRouter.get("/api/v1/productCategories", controllers.api.v1.productCategoryController.getAll);
apiRouter.get("/api/v1/productCategories/:id", controllers.api.v1.productCategoryController.getById);
apiRouter.get("/api/v1/products", controllers.api.v1.productController.getAllPartial);
apiRouter.get("/api/v1/products/:id", controllers.api.v1.productController.getById);
apiRouter.get("/api/v1/products/stat/:id", controllers.api.v1.productController.getByIdWithoutStatus);
apiRouter.get("/api/v1/name", controllers.api.v1.productController.getProductByName);
apiRouter.get("/api/v1/status", controllers.api.v1.productController.getProductsByStatus);
// Authorized Routes (All)
apiRouter.get("/api/v1/whoami", authorize.all, controllers.api.v1.authController.whoAmI);
apiRouter.get("/api/v1/users/:id", authorize.all, controllers.api.v1.userController.getById);
apiRouter.put("/api/v1/users/:id", authorize.all, upload.single("photo"), controllers.api.v1.userController.edit);

// Authorized Routes (Seller)
apiRouter.post("/api/v1/productCategories", authorize.seller, controllers.api.v1.productCategoryController.create);
apiRouter.put("/api/v1/productCategories/:id", authorize.seller, controllers.api.v1.productCategoryController.edit);
apiRouter.delete("/api/v1/productCategories/:id", authorize.seller, controllers.api.v1.productCategoryController.delete);
apiRouter.post("/api/v1/products", authorize.seller, upload.array("photos", 5), controllers.api.v1.productController.create);
apiRouter.put("/api/v1/products/:id", authorize.seller, upload.array("photos", 5), controllers.api.v1.productController.edit);
apiRouter.delete("/api/v1/products/:id", authorize.seller, controllers.api.v1.productController.delete);
apiRouter.get("/api/v1/errors", () => {
  throw new Error("Second Hand Error");
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
