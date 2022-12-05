const app = require("./app.js");
require("dotenv").config();

const port = process.env.SERVER_PORT || 8085;

app.listen(port, () => {
    console.log(`Server ativo na porta ${port}`);
});