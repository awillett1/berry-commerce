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

// Initialize Firebase using configuration from Firebase Storage
async function initializeFirebase() {
    try {
      // Access Firebase Storage without initializing Firebase
      const storage = firebase.storage();
  
      // Get a reference to the firebaseConfig.json file in Firebase Storage
      const storageRef = storage.ref().child('firebaseConfig.json');
  
      // Get the download URL of the firebaseConfig.json file
      const downloadURL = await storageRef.getDownloadURL();
  
      // Fetch Firebase configuration from the URL
      const configResponse = await fetch(downloadURL);
      const firebaseConfig = await configResponse.json(); // Assuming firebaseConfig.json is in JSON format
  
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