// Check if firebaseInstance is already declared
if (!window.firebaseInstance) {
    // Declare firebaseInstance if not already defined
    let firebaseInstance;

    if (!firebaseInstance || !firebaseInstance.apps.length) {
        // Fetch firebaseConfig from server and initialize Firebase
        document.addEventListener('DOMContentLoaded', async function () {
            try {
                // Fetch Firebase configuration from the server
                const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
                const firebaseConfig = await response.json();

                // Initialize Firebase with the fetched configuration
                firebaseInstance.initializeApp(firebaseConfig);

                // Continue with the rest of your code
                addEventListeners();

            } catch (error) {
                console.error('Error fetching or initializing Firebase:', error);
                // Handle errors, e.g., prevent further execution or show an error message
            }
        });
    }
}

function addEventListeners() {
    document.getElementById('userIcon').addEventListener('click', function(event) {
        event.preventDefault();
        checkLoginAndRedirect();
    });
}

function checkLoginAndRedirect() {
    firebaseInstance.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            const firestore = firebaseInstance.firestore();
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
