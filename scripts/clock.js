// Initialize a random starting second between 0 and 59
let seconds = Math.floor(Math.random() * 60);

function renderAllUTS() {
    // Convert the `seconds` value to a 2-digit string, e.g., 5 -> "05"
    const padded = String(seconds).padStart(2, '0');

    // Select all elements with the class `.uts-seconds`
    const elements = document.querySelectorAll('.uts-seconds');

    // Loop through each selected element
    elements.forEach(el => {
        // Update the text content to show the current seconds (padded)
        el.textContent = padded;

        // If the seconds read "59", apply a visual class effect
        if (padded === "59") {
            // Add the "restart" class (presumably triggers an animation or style change)
            el.classList.add("restart");

            // Remove the "restart" class after 2 seconds
            setTimeout(() => {
                el.classList.remove("restart");
            }, 1500);
        }
    });
}

function updateUTS() {
    // Determine randomly if a glitch should occur (5% chance)
    const isGlitch = Math.random() < (1 / 20);

    if (isGlitch) {
        // Decide which type of glitch to apply
        const glitchType = Math.random();

        if (glitchType < 0.5) {
            // Glitch type 1: jump the seconds backwards by 1–3 seconds
            const jumpBack = Math.floor(Math.random() * 3) + 1;
            seconds = (seconds - jumpBack + 60) % 60; // Wrap around if negative
        } else {
            // Glitch type 2: freeze — skip this update entirely
            return;
        }
    } else {
        // No glitch: increment seconds by 1 (wrapping back to 0 at 60)
        seconds = (seconds + 1) % 60;
    }

    // Update all the UTS displays with the new value
    renderAllUTS();
}

// Render the initial seconds immediately when the script loads
renderAllUTS();

// Start updating the UTS every second
setInterval(updateUTS, 1000);
