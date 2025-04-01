/* CTA MODAL AND BUTTON */

// Get the modal
var modal = document.getElementById("popUpModal");

// Get the button that opens the modal
var btn = document.getElementById("leveringBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* ORDER BEFORE 15.00 COUNTDOWN IN MODAL */

// Function to get the next 15:00 (3 PM) target time
function getNextTargetTime() {
    const now = new Date();
    let targetTime = new Date();

    // Set the target time to 15:00 today
    targetTime.setHours(15, 0, 0, 0);

    if (now >= targetTime) {
        // If it's already past 15:00, return null (countdown shouldn't restart)
        return null;
    }

    return targetTime.getTime();
}

// Function to update the countdown
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        // Calculate hours, minutes, and seconds
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display text and countdown
        document.getElementById("countdown-container").innerHTML = `
            <h2>Bestil inden</h3>
            <h2 id="countdown">${hours}t ${minutes}m ${seconds}s</h2>
            <h2>og få din ordre sendt allerede i dag!</h3>
        `;
    } else {
        // Show message and stop countdown
        document.getElementById("countdown-container").innerHTML = `
          <h3> Bestil inden kl 15, og så sender vi dine vare afsted allerede samme dag 🚚</h3>
        `;
        clearInterval(countdownInterval);

        // Keep message visible and reset at midnight
        setMidnightReset();
    }
}

// Function to reset the countdown at midnight
function setMidnightReset() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    midnight.setDate(midnight.getDate() + 1); // Next midnight

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    setTimeout(() => {
        startCountdown(); // Restart the countdown at midnight
    }, timeUntilMidnight);
}

// Function to start the countdown
function startCountdown() {
    targetDate = getNextTargetTime();
    if (targetDate) {
        countdownInterval = setInterval(updateCountdown, 1000);
    } else {
        // If it's after 15:00, keep the message and wait until midnight to reset
        document.getElementById("countdown-container").innerHTML = `
             <h3>Bestil inden kl 15, og så sender vi dine vare afsted allerede samme dag 🚚</h3>
        `;
        setMidnightReset();
    }
}

// Initialize countdown
let targetDate = getNextTargetTime();
let countdownInterval;
startCountdown();