require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API running!' });
});

// Placeholder for other routes
// app.use('/posts', require('./routes/postRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
