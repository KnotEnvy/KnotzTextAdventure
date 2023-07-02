import sqlite3 from 'sqlite3';

const { verbose } = sqlite3;
const db = verbose();

class Database {
    constructor() {
      this.connection = new sqlite3.Database('game.db');
      this.createUserTable();
    }
  
    createUserTable() {
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
        this.connection.run(sql);
      }
    
      saveUser(user) {
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
        this.connection.run(sql, params);
      }
    
      loadUser(username) {
        const sql = `
          SELECT * FROM users WHERE username = ?
        `;
        this.connection.get(sql, [username], (err, row) => {
          if (err) {
            return console.error(err.message);
          }
          if (row) {
            console.log(row.username, row.password, row.level, row.experience, row.gold);
            console.log(JSON.parse(row.items), JSON.parse(row.magic));
          } else {
            console.log(`No user found with the username ${username}`);
          }
        });
      }
    }

export default Database;