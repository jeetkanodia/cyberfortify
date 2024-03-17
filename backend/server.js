const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const scanRoutes = require('./routes/scanRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/dast', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/api', scanRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  