const { Router } = require("express");
const { verifyJWT } = require("../middleware/AuthenticationMiddleware");
const TransferenciaController = require("../controllers/TransferenciaController");

const routes = Router();

routes.post("/transferencia", TransferenciaController.add);

routes.get("/transferencia", TransferenciaController.listAll);
routes.get("/transferencia/:id", TransferenciaController.getById);

routes.delete("/transferencia/:id", TransferenciaController.remove);

module.exports = routes;