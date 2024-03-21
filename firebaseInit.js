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

// Initialize Firebase with custom authentication token
const userId = "rYNbguepCueEZfDNZBcn4SZOYRr1";

// Authenticate user with Firebase using email/password
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Check if the authenticated user's UID matches the specified user ID
    if (userCredential.user.uid === userId) {
      // Access firebaseConfig if the user ID matches
      const firebaseConfigRef = firebase.database().ref('firebaseConfig');
      firebaseConfigRef.once('value')
        .then((snapshot) => {
          const firebaseConfig = snapshot.val();
          console.log('Firebase Config:', firebaseConfig);
          // Use firebaseConfig as needed
        })
        .catch((error) => {
          console.error('Error accessing firebaseConfig:', error);
        });
    } else {
      console.log('Unauthorized access: User ID does not match.');
    }
  })
  .catch((error) => {
    console.error('Error authenticating user:', error);
  });

  // Call the function to initialize Firebase when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeFirebase);