const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [];
let userId = 1;

app.post("/users", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).send("Name and age are required");
  }
  const user = { id: userId++, name, age };
  users.push(user);
  res.status(201).json(user);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).send("User not found");
  }

  if (name) user.name = name;
  if (age) user.age = age;

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => u.id !== parseInt(id));
  res.send("User deleted");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});