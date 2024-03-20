
/*
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
    // Add event listener for sign-out button
    document.getElementById('signOutButton').addEventListener('click', async function() {
        // Fetch user's data from Firestore
        const user = firebaseInstance.auth().currentUser;

        if (!user) {
            console.log('No user is signed in.');
            return; // Exit the function if no user is signed in
        }

        const firestore = firebaseInstance.firestore();
        const userRef = firestore.collection('users').doc(user.uid);

        try {
            const doc = await userRef.get();
            if (doc.exists) {
                const userData = doc.data();
                const userEmail = user.email; // Get user's email
                const userRole = userData.role; // Get user's role

                // Display user's email and role in alert
                //alert(`You are signed in as ${userEmail} with the role ${userRole}.`);
            } else {
                console.log('No such user data!');
            }
        } catch (error) {
            console.log('Error getting user data:', error);
        }

        // Sign out the user
        firebaseInstance.auth().signOut().then(function() {
            // Sign-out successful, redirect to login page
            window.location.href = 'login.html';
            // Since userRole and userEmail are not accessible here, remove them from the alert
            alert('You have successfully signed out.');
        }).catch(function(error) {
            // An error happened
            console.error('Error signing out:', error);
        });
    });
}
*/
// Wait for DOM content to be loaded before adding event listeners
document.addEventListener('DOMContentLoaded', addEventListeners);

function addEventListeners() {
    // Add event listener for sign-out button
    document.getElementById('signOutButton').addEventListener('click', handleSignOut);
}

async function handleSignOut() {
    // Fetch user's data from Firestore
    const user = firebase.auth().currentUser;

    if (!user) {
        console.log('No user is signed in.');
        return; // Exit the function if no user is signed in
    }

    const firestore = firebase.firestore();
    const userRef = firestore.collection('users').doc(user.uid);

    try {
        const doc = await userRef.get();
        if (doc.exists) {
            const userData = doc.data();
            const userEmail = user.email; // Get user's email
            const userRole = userData.role; // Get user's role

            // Display user's email and role in alert
            //alert(`You are signed in as ${userEmail} with the role ${userRole}.`);
        } else {
            console.log('No such user data!');
        }
    } catch (error) {
        console.log('Error getting user data:', error);
    }

    // Sign out the user
    firebase.auth().signOut().then(function() {
        // Sign-out successful, redirect to login page
        window.location.href = 'login.html';
        // Since userRole and userEmail are not accessible here, remove them from the alert
        alert('You have successfully signed out.');
    }).catch(function(error) {
        // An error happened
        console.error('Error signing out:', error);
    });
}
