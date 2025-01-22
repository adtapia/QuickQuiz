const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Default to Dark Mode
let isDarkMode = true;

themeToggleButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode; // Toggle between modes

    if (isDarkMode) {
        body.classList.remove('light-mode');
        themeToggleButton.textContent = 'Switch to Light Mode';
    } else {
        body.classList.add('light-mode');
        themeToggleButton.textContent = 'Switch to Dark Mode';
    }
});