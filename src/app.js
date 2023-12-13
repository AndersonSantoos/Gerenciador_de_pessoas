const express = require("express");
const app = express();
const port = 3000;
const pessoaRouter = require("./routes/pessoaRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger")


app.use(cors()); 
app.use(bodyParser.json());

app.use("/pessoas", pessoaRouter);

app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`)
    logger.info(`Servidor rodando na porta: ${port}`)
});