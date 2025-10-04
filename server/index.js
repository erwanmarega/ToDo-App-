require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./database/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Todo App fonctionne !' });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
