import DOMPurify from 'dompurify';
import X from './X.js';

const root = document.getElementById('root');
const log = document.getElementById('log');

const logArea = log

// Function to update log messages
function updateLog(message) {
    // Clear existing messages
    logArea.innerHTML = DOMPurify.sanitize('')

    if (message) {
        logArea.innerHTML = DOMPurify.sanitize(message); // Display the provided message
    } else {
        logArea.innerHTML = DOMPurify.sanitize('Widgets status'); // Placeholder message
    }
}

updateLog('')

document.getElementById('init').addEventListener('click', () => {
    X.init(root, (error) => {
        if (error) {
            console.error('Error initializing widgets:', error);
            updateLog(`Error initializing widgets: ${error.message}`);
        } else {
            console.log('Widgets initialized successfully');
            updateLog('Widgets initialized successfully');
        }
    });
});

document.getElementById('destroy').addEventListener('click', () => {
    X.destroy(root);
    updateLog('Widgets destroyed successfully'); // Update log after destruction
});

// Call updateLog initially to set the placeholder
updateLog('');
