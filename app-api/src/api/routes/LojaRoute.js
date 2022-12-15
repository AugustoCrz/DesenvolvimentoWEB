const { Router } = require("express")
const { verifyJWT } = require("../middleware/AuthenticationMiddleware")
const LojaController = require("../controllers/LojaController")

const routes = Router()

routes.post("/loja", LojaController.add)
routes.post("/loja/update", LojaController.update)

routes.get("/loja", LojaController.listAll)
routes.get("/loja/:id", LojaController.getById)

routes.delete("/loja/:id", LojaController.remove)

module.exports = routes