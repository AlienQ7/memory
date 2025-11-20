// main.js

// 1. Get the list of memories
import { MEMORIES } from './memories.js';

// 2. Function to select a memory based on the date
function getMemoryOfTheDay() {
    // Get the current date (e.g., Nov 20)
    const today = new Date();
    
    // We use the day of the year (0 to 365) to create a consistent, repeating index.
    // A simple approach: use the day of the month (1-31) as the index base.
    const dayOfMonth = today.getDate(); // 1 through 31

    // Use a hash based on the day of the month to select an index
    const index = dayOfMonth % MEMORIES.length;

    return MEMORIES[index];
}

// 3. Function to display the memory on the page
function displayMemory() {
    const memory = getMemoryOfTheDay();

    // Select the HTML elements where the memory should be displayed
    const container = document.getElementById('memory-container');
    
    if (container) {
        container.innerHTML = `
            <div class="memory-card">
                <h3>${memory.date}</h3>
                <p>${memory.text}</p>
                ${memory.image ? `<img src="${memory.image}" alt="${memory.date}">` : ''}
            </div>
        `;
    }
}

// 4. Run the function when the page loads
document.addEventListener('DOMContentLoaded', displayMemory);
