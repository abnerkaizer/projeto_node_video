//config inicial
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const personRoutes = require("./routes/personRoutes");

const app = express();

//Forma de ler JSON / middlewares

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//Rotas da API

app.use("/person", personRoutes);
//Rota inicial / endpoint
app.get("/", (req, res) => {
  res.json({ message: "Oi express !" });
});

//Entregar uma porta para o express ser acessado
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yfz4tvr.mongodb.net/api_database?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB.");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
