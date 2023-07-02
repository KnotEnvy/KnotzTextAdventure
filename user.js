import Database from './database.js';

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.level = 1;
    this.experience = 0;
    this.gold = 100;
    this.items = [];
    this.magic = [];
  }

    login(database) {
        // Load user's data from the database
        const userData = database.loadUser(this.username);
        if (userData === null) {
        // If no user data was found, throw an error
        throw new Error('Invalid username');
        } else {
        // If user data was found, check the password
        if (userData.password !== this.password) {
            throw new Error('Invalid password');
        }
        // Load the user's game data
        this.level = userData.level;
        this.experience = userData.experience;
        this.gold = userData.gold;
        this.items = userData.items;
        this.magic = userData.magic;
        }
    }

    register(database) {
        // Check if the username is already taken
        const userData = database.loadUser(this.username);
        if (userData !== null) {
        // If user data was found, throw an error
        throw new Error('Username already taken');
        }
        // Save the new user's data to the database
        database.saveUser(this);
    }


    saveGame(database) {
        // Save user's game data to the database
        database.saveUser(this);
    }

static loadGame(username, database) {
    // Load user's game data from the database
    const userData = database.loadUser(username);
    if (userData !== null) {
        // If user data was found, create a new User instance with the loaded data
        const user = new User(userData.username, userData.password);
        user.level = userData.level;
        user.experience = userData.experience;
        user.gold = userData.gold;
        user.items = userData.items;
        user.magic = userData.magic;
        return user;
    } else {
        // If no user data was found, return null
        return null;
        }
    }
}

export default User;
