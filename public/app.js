// Theme management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
setTheme(initialTheme);

themeToggle.addEventListener('click', toggleTheme);

// Listen for system theme changes
prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Countdown functionality
let countdownInterval;
let releaseDate;

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('Failed to load config:', error);
        // Fallback to default date
        return {
            releaseDate: '2026-11-19T00:00:00-05:00',
            title: 'GTA VI Countdown',
            description: 'Live countdown to the Grand Theft Auto VI release date'
        };
    }
}

function formatTimeUnit(value) {
    return value.toString().padStart(2, '0');
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = releaseDate - now;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = formatTimeUnit(days);
    document.getElementById('hours').textContent = formatTimeUnit(hours);
    document.getElementById('minutes').textContent = formatTimeUnit(minutes);
    document.getElementById('seconds').textContent = formatTimeUnit(seconds);
}

function formatReleaseDate(dateString) {
    const date = new Date(dateString);
    
    // Format date in user's timezone
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    
    return date.toLocaleString(undefined, options);
}

async function initCountdown() {
    const config = await loadConfig();
    
    // Parse the release date (handles timezone)
    releaseDate = new Date(config.releaseDate).getTime();
    
    // Update the release date display
    const releaseTimeElement = document.getElementById('release-time');
    releaseTimeElement.setAttribute('datetime', config.releaseDate);
    releaseTimeElement.textContent = formatReleaseDate(config.releaseDate);
    
    // Start countdown
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Initialize the countdown
initCountdown();
