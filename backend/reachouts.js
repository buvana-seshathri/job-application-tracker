const express = require('express');
const router = express.Router();
const db = require('./db');

// GET all reachouts
router.get('/reachouts', (req, res) => {
  db.all('SELECT * FROM reachouts ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new reachout
router.post('/reachouts', (req, res) => {
  const { person_name, company, reached_out_date } = req.body;

  db.run(
    `INSERT INTO reachouts (person_name, company, got_response, reached_out_date)
     VALUES (?, ?, 0, ?)`,
    [person_name, company, reached_out_date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// PUT — toggle whether they responded
router.put('/reachouts/:id', (req, res) => {
  const { got_response } = req.body;

  db.run(
    'UPDATE reachouts SET got_response = ? WHERE id = ?',
    [got_response ? 1 : 0, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE a reachout
router.delete('/reachouts/:id', (req, res) => {
  db.run('DELETE FROM reachouts WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
