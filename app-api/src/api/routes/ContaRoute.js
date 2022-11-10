const { Router } = require("express");
const { verifyJWT } = require("../middleware/AuthenticationMiddleware");
const ContaController = require("../controllers/ContaController");

const routes = Router();

routes.post("/conta", verifyJWT, ContaController.add);
routes.post("/conta/update", ContaController.update);

routes.get("/conta", verifyJWT, ContaController.listAll);
routes.get("/conta/:id", verifyJWT, ContaController.getById);

routes.delete("/conta/:id", verifyJWT, ContaController.remove);

module.exports = routes;