/*
let firebaseInstance; // Declare as global var

// Check if Firebase app has already been initialized
if (!firebaseInstance) {
    // Fetch firebaseConfig from server and initialize Firebase
    document.addEventListener('DOMContentLoaded', async function () {
        try {
            // Fetch Firebase configuration from the server
            const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
            const firebaseConfig = await response.json();

            // Initialize Firebase with the fetched configuration
            firebaseInstance = firebase.initializeApp(firebaseConfig);

            // Continue with the rest of your code
            addEventListeners();

        } catch (error) {
            console.error('Error fetching or initializing Firebase:', error);
            // Handle errors, e.g., prevent further execution or show an error message
        }
    });
}

function addEventListeners() {
    document.getElementById('userIcon').addEventListener('click', function(event) {
        event.preventDefault();
        checkLoginAndRedirect();
    });
}

function checkLoginAndRedirect() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            const firestore = firebase.firestore();
            const userRef = firestore.collection('users').doc(user.uid);

            userRef.get().then(function(doc) {
                if (doc.exists) {
                    const userData = doc.data();
                    const userRole = userData.role;

                    // Redirect to appropriate page based on user role
                    if (userRole === 'user') {
                        window.location.href = 'account.html';
                    } else if (userRole === 'seller') {
                        window.location.href = 'seller.html';
                    }
                } else {
                    console.log('No user data found!');
                    // Handle case where user data does not exist
                }
            }).catch(function(error) {
                console.log('Error getting user data:', error);
            });
        } else {
            // No user is signed in
            window.location.href = 'login.html';
        }
    });
}
*/

// address.js 

// Function to handle the click event on the user icon
function handleUserIconClick(event) {
    event.preventDefault();
    checkLoginAndRedirect();
}

async function checkLoginAndRedirect() {
    try {
        // Wait for Firebase to be initialized
        await firebase.auth().waitForSignInState();

        // Get the current user
        const user = firebase.auth().currentUser;

        if (user) {
            // User is signed in
            const firestore = firebase.firestore();
            const userRef = firestore.collection('users').doc(user.uid);

            // Get user data from Firestore
            const userDoc = await userRef.get();

            if (userDoc.exists) {
                const userData = userDoc.data();
                const userRole = userData.role;

                console.log('User Role:', userRole); // Log user's role

                // Redirect to appropriate page based on user role
                if (userRole === 'user') {
                    console.log('Redirecting to user page...')
                    window.location.href = 'account.html';
                } else if (userRole === 'seller') {
                    console.log('Redirecting to seller page...');
                    window.location.href = 'seller.html';
                }
            } else {
                console.log('No user data found!');
                // Handle case where user data does not exist
            }
        } else {
            // No user is signed in
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        // Handle errors, e.g., prevent further execution or show an error message
    }
}

// Add event listener to the user icon
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('userIcon').addEventListener('click', handleUserIconClick);
});

// Log Firebase initialization errors
window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection:', event.reason);
});
