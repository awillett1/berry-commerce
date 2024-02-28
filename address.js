// Check if Firebase app has already been initialized
if (!firebase.apps.length) {
    // Fetch firebaseConfig from server and initialize Firebase
    document.addEventListener('DOMContentLoaded', async function () {
        try {
            // Fetch Firebase configuration from the server
            const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
            const firebaseConfig = await response.json();

            // Initialize Firebase with the fetched configuration
            firebase.initializeApp(firebaseConfig);

            // Continue with the rest of your code
            const firestore = firebase.firestore();

            // Check if the user is authenticated
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in, check their role
                    checkUserRole(user.uid, firestore);
                } else {
                    // User is not signed in, redirect to login page or handle as needed
                    window.location.href = 'login.html';
                }
            });

        } catch (error) {
            console.error('Error fetching or initializing Firebase:', error);
            // Handle errors, e.g., prevent further execution or show an error message
        }
    });
}

async function checkUserRole(userId, firestore) {
    try {
        // Fetch user data from Firestore
        const userDoc = await firestore.collection('users').doc('users').collection(userId).get();

        if (userDoc.exists) {
            const userRole = userDoc.data().role;

            // Redirect based on user role
            if (userRole === 'user') {
                window.location.href = 'account.html';
            } else if (userRole === 'seller') {
                window.location.href = 'seller.html';
            } else {
                // Handle unexpected role (optional)
                alert('Invalid role. Please contact support.');
                // Redirect to a default page or handle as needed
                window.location.href = '404.html';
            }
        } else {
            // Handle user data not found (optional)
            alert('User data not found. Please contact support.');
            // Redirect to a default page or handle as needed
            window.location.href = '404.html';
        }
    } catch (error) {
        console.error('Error checking user role:', error.message);
        // Handle errors (optional)
        alert('Error checking user role. Please try again or contact support.');
        // Redirect to a default page or handle as needed
        window.location.href = '404.html';
    }
}
