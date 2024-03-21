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
// test comment

// Function to handle the click event on the user icon
function handleUserIconClick(event) {
    event.preventDefault();
    checkLoginAndRedirect();
}

// Add event listener to the user icon
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('userIcon').addEventListener('click', handleUserIconClick);
});

/*
// Function to check login status and redirect accordingly
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

function checkLoginAndRedirect() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            const firestore = firebase.firestore();
            const userRef = firestore.collection('users').doc(user.uid);
            const sellerRef = firestore.collection('sellers').doc(user.uid);

            // Check if user data exists in the 'users' collection
            userRef.get().then(function(userDoc) {
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    const userRole = userData.role;
                    // Redirect to appropriate page based on user role
                    if (userRole === 'user') {
                        window.location.href = 'account.html';
                    } else if (userRole === 'seller') {
                        window.location.href = 'seller.html';
                    }
                } else {
                    // Check if user data exists in the 'sellers' collection
                    sellerRef.get().then(function(sellerDoc) {
                        if (sellerDoc.exists) {
                            window.location.href = 'seller.html';
                        } else {
                            console.log('No user or seller data found!');
                            // Handle case where neither user nor seller data exists
                        }
                    }).catch(function(error) {
                        console.log('Error getting seller data:', error);
                    });
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
