console.log('Welcome to The Review Commission!');

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Version tracking
let currentVersion = localStorage.getItem('siteVersion') || '1.0.0';

// Function to update version
function updateVersion() {
    const parts = currentVersion.split('.');
    parts[2] = (parseInt(parts[2]) + 1).toString();
    currentVersion = parts.join('.');
    localStorage.setItem('siteVersion', currentVersion);
    document.getElementById('version').textContent = currentVersion;
}

// Initialize version display
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('version').textContent = currentVersion;
});

// Track changes to the page content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.target.id || mutation.target.id !== 'version') {
            updateVersion();
        }
    });
});

// Start observing the entire document for changes
observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
});
