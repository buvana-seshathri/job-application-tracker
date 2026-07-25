const express = require('express');
const router = express.Router();
const db = require('./db');

// GET all applications
router.get('/applications', (req, res) => {
  db.all('SELECT * FROM applications ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new application
router.post('/applications', (req, res) => {
  const { company, role, category, referral, applied_date, notes } = req.body;

  db.run(
    `INSERT INTO applications (company, role, category, referral, applied_date, status, status_updated_at, notes)
     VALUES (?, ?, ?, ?, ?, 'submitted', ?, ?)`,
    [company, role, category, referral ? 1 : 0, applied_date, applied_date, notes || ''],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// PUT — update an application's status
router.put('/applications/:id', (req, res) => {
  const { status } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  db.run(
    'UPDATE applications SET status = ?, status_updated_at = ? WHERE id = ?',
    [status, today, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE an application
router.delete('/applications/:id', (req, res) => {
  db.run('DELETE FROM applications WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
