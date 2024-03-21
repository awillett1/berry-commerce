// firebaseInit.js

// Initialize Firebase
// test comment
/*
async function initializeFirebase() {
    try {
        // Fetch Firebase configuration from the server
        const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
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
*/

// Initialize Firebase
async function initializeFirebase() {
    try {
        // Fetch Firebase configuration from Firebase Storage
        const storageRef = firebase.storage().ref();
        const configFileRef = storageRef.child('firebaseConfig.json');
        const response = await configFileRef.getDownloadURL();
        
        // Fetch Firebase configuration from the link
        const configResponse = await fetch(response);
        const firebaseConfig = await configResponse.text(); // Fetch text instead of JSON

        // Initialize Firebase with the fetched configuration
        firebase.initializeApp(JSON.parse(firebaseConfig)); // Parse JSON to object

        console.log('Firebase initialized successfully.');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        // Handle errors, e.g., prevent further execution or show an error message
    }
}

// Call the function to initialize Firebase when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeFirebase);
