// firebaseInit.js

async function firebaseInit() {
    try {
        // Fetch Firebase configuration from the server
        const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json'); // Replace with your Firebase config file path
        const firebaseConfig = await response.json();

        // Initialize Firebase with the fetched configuration
        firebase.initializeApp(firebaseConfig);

        console.log('Firebase initialized successfully.');

        return Promise.resolve(); // Resolve the promise when initialization is done
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        return Promise.reject(error); // Reject the promise if an error occurs
    }
}

// Call the function to initialize Firebase when the DOM content is loaded
document.addEventListener('DOMContentLoaded', firebaseInit);

