const { Router } = require("express");
const { verifyJWT } = require("../middleware/AuthenticationMiddleware");
const AcaoController = require("../controllers/AcaoController");

const routes = Router();

routes.post("/acao", AcaoController.add);
routes.post("/acao/update", AcaoController.update);

routes.get("/acao", AcaoController.listAll);
routes.get("/acao/:id", AcaoController.getById);

routes.delete("/acao/:id", AcaoController.remove);

module.exports = routes;