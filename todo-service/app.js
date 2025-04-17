const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const TodoModel = require('./models/todo');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use environment variable for SQLite storage path to persist data in Docker volume
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'production' 
    ? '/app/data/todos.db'  // Mounted Docker volume path
    : './todos.db'           // Local dev path
});

const Todo = TodoModel(sequelize);

sequelize.sync();

// CRUD Endpoints
app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});
app.post('/todos', async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
});
app.put('/todos/:id', async (req, res) => {
  const [updated] = await Todo.update(req.body, { where: { id: req.params.id } });
  res.json({ updated });
});
app.delete('/todos/:id', async (req, res) => {
  await Todo.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
// Listen on all interfaces so container can receive external requests
app.listen(PORT, '0.0.0.0', () => console.log(`Todo service running on ${PORT}`));
