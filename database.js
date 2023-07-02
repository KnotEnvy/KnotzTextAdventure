import sqlite3 from './sqlite3.js';

const { verbose } = sqlite3;
const db = verbose();

class Database {
  constructor() {
    this.connection = new sqlite3.Database('game.db');
  }

  async createUserTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        password TEXT,
        level INTEGER,
        experience INTEGER,
        gold INTEGER,
        items TEXT,
        magic TEXT
      )
    `;
    return new Promise((resolve, reject) => {
      this.connection.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async saveUser(user) {
    const sql = `
      INSERT OR REPLACE INTO users (username, password, level, experience, gold, items, magic)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      user.username,
      user.password,
      user.level,
      user.experience,
      user.gold,
      JSON.stringify(user.items),
      JSON.stringify(user.magic)
    ];
    return new Promise((resolve, reject) => {
      this.connection.run(sql, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async loadUser(username) {
    const sql = `
      SELECT * FROM users WHERE username = ?
    `;
    return new Promise((resolve, reject) => {
      this.connection.get(sql, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

export default Database;
