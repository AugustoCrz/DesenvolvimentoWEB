const express = require("express");
const bodyParser = require("body-parser"); // Necessário para interpretar o corpo das requisições HTTP
const cors = require("cors");

const ContaRoutes = require("./src/api/routes/ContaRoute")

const app = express();

//Configuração dos middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json()); // Converterá qualquer corpo em JSON em um objeto javascript

app.use(ContaRoutes);

//Exporta o aplicativo express configurado
module.exports = app;