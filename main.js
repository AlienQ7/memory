// main.js
import { SLIDES } from './memories.js'; // Note: Import SLIDES, not MEMORIES

let currentSlideIndex = 0;
let slideshowInterval;
let isPaused = true;
const SLIDE_DURATION = 3000; // 3000ms = 3 seconds per slide

const startButton = document.getElementById('start-button');
const slideshowSection = document.getElementById('slideshow-section');
const slideshowContainer = document.getElementById('slideshow-container');
const captionDisplay = document.getElementById('caption-display');


// --- CORE FUNCTIONS ---

function updateSlide() {
    const slide = SLIDES[currentSlideIndex];
    
    // Clear previous content
    slideshowContainer.innerHTML = ''; 

    // Create and inject the new image
    const img = document.createElement('img');
    img.src = slide.image;
    img.alt = slide.caption;
    slideshowContainer.appendChild(img);

    // Update the caption
    captionDisplay.textContent = slide.caption;

    // Move to the next index, looping back to 0 when done
    currentSlideIndex = (currentSlideIndex + 1) % SLIDES.length;
}

function startSlideshow() {
    if (SLIDES.length === 0) return;

    // 1. Set the initial state
    isPaused = false;
    startButton.style.display = 'none'; // Hide the start button
    slideshowSection.style.display = 'block'; // Show the slideshow area
    
    // 2. Load the first slide immediately
    updateSlide(); 
    
    // 3. Start the timer to change slides periodically
    slideshowInterval = setInterval(updateSlide, SLIDE_DURATION);
}

function togglePause() {
    if (isPaused) {
        // RESUME
        isPaused = false;
        slideshowInterval = setInterval(updateSlide, SLIDE_DURATION);
        
        // Optional: Provide visual feedback (e.g., change cursor or overlay)
        console.log("Slideshow Resumed.");
        
    } else {
        // PAUSE
        isPaused = true;
        clearInterval(slideshowInterval); // Stop the timer
        console.log("Slideshow Paused.");
    }
}


// --- EVENT LISTENERS ---

// 1. Start button listener
startButton.addEventListener('click', startSlideshow);

// 2. Click/Touch listener on the entire document body for pausing
document.body.addEventListener('click', (event) => {
    // Prevent the click on the start button from immediately pausing it
    if (event.target.id !== 'start-button') {
        if (slideshowSection.style.display === 'block') {
            togglePause();
        }
    }
});

// For better mobile compatibility, you might also want to add 'touchend'
document.body.addEventListener('touchend', (event) => {
    if (event.target.id !== 'start-button') {
        if (slideshowSection.style.display === 'block') {
            togglePause();
        }
    }
});
