const pool = require('../config/db.js');
const bcrypt = require('bcrypt');


const createUser = async (username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
    [username, hashedPassword, role]
  );
  return result.rows[0];
};


const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
};

const findUserByID = async (user_id) => {
  const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
};

const storeRefreshToken = async (userId, token, expiresIn) => {
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)', [userId, token, expiresAt])
};

module.exports = { findUserByEmail, findUserByID, findUserByUsername, createUser, storeRefreshToken };
