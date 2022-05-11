const express = require("express");
const { v4: uuid } = require("uuid");
const cors = require("cors");

let todos = [];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.patch("/todos", (req, res) => {
  const requestTodos = req.body;
  const processedTodos = requestTodos.map((todo) => ({
    id: todo.id ?? uuid(),
    content: todo.content,
    status: todo.status,
  }));

  todos = processedTodos;

  return res.send(processedTodos);
});

app.listen(3001, () => {
  console.log("Server up!");
});
