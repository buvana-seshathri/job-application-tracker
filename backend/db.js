const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./tracker.db');

// Runs once when the server starts. If tables already exist, this does nothing.
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'submitted',
      referral INTEGER DEFAULT 0,
      applied_date TEXT NOT NULL,
      status_updated_at TEXT,
      notes TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS linkedin_reachouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      person_name TEXT,
      company TEXT,
      got_response INTEGER DEFAULT 0,
      reached_out_date TEXT NOT NULL
    )
  `);
});

module.exports = db;
