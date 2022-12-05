const { Router } = require("express");
const { verifyJWT } = require("../middleware/AuthenticationMiddleware");
const ProdutoController = require("../controllers/ProdutoController");

const routes = Router();

routes.post("/produto", ProdutoController.add);
routes.post("/produto/update", ProdutoController.update);

routes.get("/produto", ProdutoController.listAll);
routes.get("/produto/:id", ProdutoController.getById);

routes.delete("/produto/:id", ProdutoController.remove);

module.exports = routes;