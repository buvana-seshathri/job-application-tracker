const express = require('express');
const cors = require('cors');
require('./db'); // just runs the table setup

const app = express();
app.use(cors());
app.use(express.json());

// Test route — Phase 1: frontend talking to backend.
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend! Database is ready.' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
