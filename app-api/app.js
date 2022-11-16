const express = require("express");
const bodyParser = require("body-parser"); // Necessário para interpretar o corpo das requisições HTTP
const cors = require("cors");

const AcaoRoutes = require("./src/api/routes/AcaoRoute")
const LojaRoutes = require("./src/api/routes/LojaRoute")
const ContaRoutes = require("./src/api/routes/ContaRoute")
const ProdutoRoutes = require("./src/api/routes/ProdutoRoute")
const TransferenciaRoutes = require("./src/api/routes/TransferenciaRoute")

const app = express();

//Configuração dos middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json()); // Converterá qualquer corpo em JSON em um objeto javascript

app.use(AcaoRoutes);
app.use(LojaRoutes);
app.use(ContaRoutes);
app.use(ProdutoRoutes);
app.use(TransferenciaRoutes);

//Exporta o aplicativo express configurado
module.exports = app;