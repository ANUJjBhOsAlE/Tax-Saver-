const db = require('../config/db');

function registerUser(username, password, callback) {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], callback);
}

module.exports = { registerUser };
