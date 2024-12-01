const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

const MakeTable = () => {
  const MakeTableSQL = `
    CREATE TABLE IF NOT EXISTS Landmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Landmark VARCHAR(255) NOT NULL,
      Details TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`;
  
  db.run(MakeTableSQL, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "Landmarks" is ready.');
    }
  });
};

MakeTable();

exports.getAllUsers = (callback) => {
  db.all('SELECT * FROM Landmarks', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

exports.addUser = (Landmark, Details, callback) => {
  const stmt = db.prepare('INSERT INTO users (Landmark, Details) VALUES (?, ?)');
  stmt.run([Landmark, Details], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, Landmark, Details });
  });
  stmt.finalize();
};