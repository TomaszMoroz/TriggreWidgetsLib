import DOMPurify from 'dompurify';
import X from './X.js';

const root = document.getElementById('root');
const log = document.getElementById('log');

const logArea = log

// Function to update log messages
function updateLog(message, level = 'info') {
    // Clear existing messages
    logArea.innerHTML = DOMPurify.sanitize('')
    logArea.classList.remove('error', 'done', 'info')

    if (message) {
        const sanitizedMessage = DOMPurify.sanitize(message);
        logArea.innerHTML = sanitizedMessage; // Display the provided message
        logArea.classList.add(`${level}`)
    } else {
        logArea.innerHTML = 'Widgets Status'; // Placeholder message
        logArea.classList.add('info')
    
    }
}

updateLog('')

document.getElementById('init').addEventListener('click', () => {
    X.init(root, (error) => {
        if (error) {
            const errorsSummary = error.map(e => `Widget ${e.widget}: ${e.error}`).join('; ')
            console.error('Error initializing widgets:', error);
            updateLog(`${errorsSummary}`, 'error');
        } else {
            console.log('Widgets initialized successfully');
            updateLog('Widgets initialized successfully', 'done');
        }
    });
});

document.getElementById('destroy').addEventListener('click', () => {
    X.destroy(root);
    updateLog('Widgets destroyed successfully', 'done'); // Update log after destruction
});

// Call updateLog initially to set the placeholder
updateLog('');
