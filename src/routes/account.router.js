module.exports = (router) => {
  // Gọi sang controller
  const homeController = require("../controllers/account.controller");

  router.get("/account", homeController.account);

  router.get("/account/:id", homeController.detail);

  router.post("/account/add", homeController.add);

  router.patch("/account/update/:id", homeController.update);

  router.delete("/account/delete/:id", homeController.delete);
};
