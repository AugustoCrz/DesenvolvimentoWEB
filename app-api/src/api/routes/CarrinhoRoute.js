const { Router } = require("express")
const { verifyJWT } = require("../middleware/AuthenticationMiddleware")
const CarrinhoController = require("../controllers/CarrinhoController")

const routes = Router()

routes.post("/carrinho", CarrinhoController.add)
routes.post("/carrinho/update", CarrinhoController.update)

routes.get("/carrinho", CarrinhoController.listAll)
routes.get("/carrinho/:id", CarrinhoController.getById)

routes.delete("/carrinho/:id", CarrinhoController.remove)

module.exports = routes