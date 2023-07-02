
// Import necessary modules and classes
import User from './user.js';
import Database from './database.js';
import generateText from './openai.js';

class Game {
    constructor() {
        this.user = null;
        this.story = '';
        this.database = new Database();

        // // Game initialization logic
        // const action = prompt("Do you want to (l)og in or (r)egister?");
        // const username = prompt("Enter your username:");
        // const password = prompt("Enter your password:");
        // if (action === 'l') {
        //     this.user = new User(username, password);
        //     this.user.login(this.database);
        // } else if (action === 'r') {
        //     this.user = new User(username, password);
        //     this.user.register(this.database);
        // } else {
        //     throw new Error('Invalid action');
        // }

        // Display the player's stats in the sidebar
        this.updateUI();
    }
  
    startGame() {
        // Bypass the login process and directly create a user
        this.user = new User('testUser', 'testPassword');
        this.user.level = 1;
        this.user.experience = 0;
        this.user.gold = 100;
        this.user.items = [];
        this.user.magic = [];
      
        // Display the player's stats in the sidebar
        this.updateUI();
      
        // Generate the initial story
        this.generateStory();
      }
    // startGame() {
    //     // Game initialization logic
    //     const action = prompt("Do you want to (l)og in or (r)egister?");
    //     const username = prompt("Enter your username:");
    //     const password = prompt("Enter your password:");
    //     if (action === 'l') {
    //       this.user = new User(username, password);
    //       this.user.login(this.database);
    //     } else if (action === 'r') {
    //       this.user = new User(username, password);
    //       this.user.register(this.database);
    //     } else {
    //       throw new Error('Invalid action');
    //     }
    
    //     // Display the player's stats in the sidebar
    //     this.updateUI();
    //   }
      updateUI() {
        document.getElementById('level').textContent = `Level: ${this.user.level}`;
        document.getElementById('experience').textContent = `Experience: ${this.user.experience}`;
        document.getElementById('gold').textContent = `Gold: ${this.user.gold}`;
        document.getElementById('items').textContent = `Items: ${this.user.items.join(', ') || 'None'}`;
        document.getElementById('magic').textContent = `Magic: ${this.user.magic.join(', ') || 'None'}`;
      }
      
  
    async generateStory() {
        const prompt = "The hackers of Hacktivate Nation are planning their next move. What happens?";
        this.story = await generateText(prompt);
        document.getElementById('game-output').textContent = this.story;
    
        // After generating the story, give the player a random item or magic spell
        if (Math.random() < 0.5) {
        // 50% chance to get an item
        const items = ['Hacktivate Sword', 'Shield of Encryption', 'Potion of Code', 'Bandwidth Booster'];
        const item = items[Math.floor(Math.random() * items.length)];
        this.user.items.push(item);
        this.story += `\nYou found a ${item}!`;
        } else {
        // 50% chance to get a magic spell
        const magicSpells = ['Firewall', 'DDoS Attack', 'Malware', 'VPN Shield'];
        const magic = magicSpells[Math.floor(Math.random() * magicSpells.length)];
        this.user.magic.push(magic);
        this.story += `\nYou learned the ${magic} spell!`;
        }
    
        // Update the game output and the UI
        document.getElementById('game-output').textContent = this.story;
        this.updateUI();
    }
    
  
    processUserInput(input) {
        // Handle user input and progress the game
        if (input === '1' || input === '2' || input === '3' || input === '4') {
        // Increase the player's experience and gold
        this.user.experience += 10;
        this.user.gold += 10;
    
        // If the player has enough experience, increase their level
        if (this.user.experience >= this.user.level * 100) {
            this.user.level++;
            this.user.experience = 0;
        }
    
        // Update the UI to reflect the new stats
        this.updateUI();
    
        // Generate the next part of the story
        this.generateStory();
        } else {
        // If the input was not a valid choice, display an error message
        this.story += '\nInvalid choice. Please enter 1, 2, 3, or 4.';
        document.getElementById('game-output').textContent = this.story;
        }
    }
    
    
    useItem(item) {
        const index = this.user.items.indexOf(item);
        if (index !== -1) {
            // If the user has the item, use it
            this.user.items.splice(index, 1);
            this.story += `\nYou used the ${item}.`;
            document.getElementById('game-output').textContent = this.story;
        } else {
            // If the user doesn't have the item, display an error message
            this.story += `\nYou don't have a ${item}.`;
            document.getElementById('game-output').textContent = this.story;
        }
        this.updateUI();
        
    }
    
  
    levelUp() {
        // Increase user's level and update stats
        this.user.level++;
        this.updateUI();
    }
    saveGame() {
        this.user.saveGame(this.database);
    }
} 
function updateHealth(health) {
    const healthElement = document.getElementById('health');
    healthElement.style.width = `${health}%`;
}

// Usage
updateHealth(50); // Player has 50% health

function typeText(element, text, delay = 50) {
    let i = 0;
    const typing = setInterval(() => {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
    } else {
        clearInterval(typing);
    }
    }, delay);
}
  
// Usage
const gameOutput = document.getElementById('game-output');
typeText(gameOutput, 'The hackers of Hacktivate Nation are planning their next move...');

  
const game = new Game();
game.startGame();

document.getElementById('command-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    game.processUserInput(event.target.value);
    event.target.value = '';
  }
});

document.getElementById('save-button').addEventListener('click', () => {
  game.saveGame();
});


  
  
  