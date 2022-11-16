const { Router } = require("express");
const { verifyJWT } = require("../middleware/AuthenticationMiddleware");
const AcaoController = require("../controllers/AcaoController");

const routes = Router();

routes.post("/conta", AcaoController.add);
routes.post("/conta/update", AcaoController.update);

routes.get("/conta", AcaoController.listAll);
routes.get("/conta/:id", AcaoController.getById);

routes.delete("/conta/:id", AcaoController.remove);

module.exports = routes;