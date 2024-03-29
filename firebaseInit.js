// firebaseInit.js

// Initialize Firebase
async function initializeFirebase() {
    try {
        // Fetch Firebase configuration from the server
        const response = await fetch('x');
        const firebaseConfig = await response.json();

        // Initialize Firebase with the fetched configuration
        firebase.initializeApp(firebaseConfig);

        console.log('Firebase initialized successfully.');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        // Handle errors, e.g., prevent further execution or show an error message
    }
}

// Call the function to initialize Firebase when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeFirebase);


