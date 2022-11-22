// const routes = require("express").Router();
const { Router } = require("express");
const { verifyJWT } = require("../middleware/AuthenticationMiddleware");

const UserController = require("../controllers/UserController")

const routes = Router();

// o GET /user não vai precisar de autenticação
routes.post("/user", UserController.createUser);
routes.get("/user/:id", UserController.getUser);

module.exports = routes;