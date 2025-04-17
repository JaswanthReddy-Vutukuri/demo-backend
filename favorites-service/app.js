const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const FavoriteModel = require('./models/favorite');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use environment variable for SQLite storage path to persist data in Docker volume
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'production' 
    ? '/app/data/favorites.db'  // Mounted Docker volume path
    : './favorites.db'           // Local dev path
});

const Favorite = FavoriteModel(sequelize);

sequelize.sync();

// Set or unset favorite
app.post('/favorites/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const existing = await Favorite.findOne({ where: { todoId } });
  if (existing) {
    await existing.destroy();
    res.json({ favorited: false });
  } else {
    await Favorite.create({ todoId });
    res.json({ favorited: true });
  }
});

// Get all favorites
app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.findAll();
  res.json(favorites);
});

const PORT = process.env.PORT || 3001;
// Listen on all interfaces so container can receive external requests
app.listen(PORT, '0.0.0.0', () => console.log(`Todo service running on ${PORT}`));
