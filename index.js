const express = require("express");
const app = express();
// aqui informo ao express que no corpo ele vai isar json
app.use(express.json());

app.get("/hello", function (req, res) {
  res.send("Hello World");
});
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

// Escolha um filme a lista aqui representa um db
const lista = ["senhor dos aneis", "harry porter"];
app.get("/filmes", function (req, res) {
  res.send(lista);
});

// [get] read id/index
// com arrow function que e a mesma coisa
app.get("/filmes/:id", (req, res) => {
  const id = req.params.id;
  const item = lista[id - 1];
  res.send(item);
});

// [post] -create
//quando quero criar ou atualizar sempre passo no body usando json
app.post("/filmes", (req, res) => {
  const item = req.body.nome_filme;
  lista.push(item);
  res.send("item criado com sucesso.");
});

// [Put/patch] - Update

app.put("/filmes/:id", (req, res) => {
  const id = req.params.id;
  const item = req.body.nome_filme;
  lista[id - 1] = item;
  res.send("item editado com sucesso.");
});

// [delete] - delete
app.delete("/filmes/:id", (req, res) => {
  const id = req.params.id;
  delete lista[id - 1];
  res.send("item removido com sucesso.");
});

//no geral usando ID eu vou alterar unico elemento.
app.listen(3000);
