const express = require('express');
const cors = require('cors');
require('./db'); // sets up tables

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./applications'));
app.use('/api', require('./reachouts'));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
