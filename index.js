const express = require("express");
//configuração do mongodb
const { MongoClient, ObjectId } = require("mongodb");
(async () => {
  const url = "mongodb://localhost:27017";
  const dbname = "aulafilmes";

  console.info("conectando ao banco de dados ....");
  // retorno do promisse com await ele cumpre a promessa.
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.info("conectado ao Mongo DB");
  const db = client.db(dbname);

  const app = express();
  // aqui informo ao express que no corpo ele vai isar json
  app.use(express.json());

  app.get("/hello", function (req, res) {
    res.send("Hello World");
  });
  // Escolha um filme a lista aqui representa um db

  const filmes = db.collection("filmes");

  // [GET] - Read All
  app.get("/filmes", async (req, res) => {
    const listaFilmes = await filmes.find().toArray();

    res.send(listaFilmes);
  });

  // [get] read id/index
  // com arrow function que e a mesma coisa
  app.get("/filmes/:id", async (req, res) => {
    const id = req.params.id;
    //pelo mongoDb
    const item = await filmes.findOne({ _id: ObjectId(id) });
    res.send(item);
  });

  // [post] -create
  //quando quero criar ou atualizar sempre passo no body usando json
  app.post("/filmes", async (req, res) => {
    const item = req.body;
    await filmes.insertOne(item);
    res.send(item);
  });

  // [Put/patch] - Update
  app.put("/filmes/:id", async (req, res) => {
    const id = req.params.id;
    const item = req.body;
    await filmes.updateOne({ _id: ObjectId(id) }, { $set: item });
    res.send(item);
  });

  // [delete] - delete
  app.delete("/filmes/:id", async (req, res) => {
    const id = req.params.id;
    await filmes.deleteOne({ _id: ObjectId(id) });
    res.send("Item removido com sucesso.");
  });

  //no geral usando ID eu vou alterar unico elemento.
  app.listen(3000);

  // return Promise.reject("Oops!").catch((err) => {
  //   throw new Error(err);
  // });
})(); //Async

/* lista de end-point CRUD
  devemos seguir os verbos http
  assim nossa aplicação segue o REST 
  aplicações que seguem o Rest são chamadoas de restfull
  Create -->
  [post] -create 
  [get] - read
  [Put/patch] - Update
  [delete] - delete
  */
