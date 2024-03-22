// Check if Firebase app has already been initialized
/*
if (!firebaseInstance) {
    // Fetch firebaseConfig from server and initialize Firebase
    document.addEventListener('DOMContentLoaded', async function () {
        try {
            // Fetch Firebase configuration from the server
            const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
            const firebaseConfig = await response.json();

            // Initialize Firebase with the fetched configuration
            firebase.initializeApp(firebaseConfig);

            const loginForm = document.getElementById('loginForm');
            loginForm.addEventListener('submit', handleLogin);

        } catch (error) {
            console.error('Error fetching or initializing Firebase:', error);
            // Handle errors, e.g., prevent further execution or show an error message
        }
    });
}
*/
// login.js

// Assume Firebase has been initialized elsewhere
document.addEventListener('DOMContentLoaded', async function () {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
});

/*
async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;
    const selectedRole = document.querySelector('input[name="role"]:checked').value; // Get the selected role from the login form

    try {
        // Sign in user with email/password
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User logged in successfully:', user.email);

        // Get a reference to the Firestore database
        const firestore = firebase.firestore();

        // Fetch user data from Firestore
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            const userRole = userData.role;

            // Check if user role matches the selected role in the login form
            if (userRole === selectedRole) {
                // Redirect the user to index.html or any other desired page upon successful login
                window.location.href = 'index.html';
                alert('Login successful!');
            } else {
                alert('You do not have permission to access this account. Please log in with the correct role.');
            }
        } else {
            alert('User data not found. Please sign up for an account.');
        }
    } catch (error) {
        console.error('Error logging in:', error.message);

        // Check for specific error codes
        if (error.code === 'auth/user-not-found') {
            alert('User not found. Please check your email or sign up for a new account.');
        } else if (error.code === 'auth/wrong-password') {
            alert('Incorrect password. Please try again.');
        } else {
            // Handle other login errors
            alert('Login failed. Please try again.');
        }
    }
}
*/

async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;
    const selectedRole = document.querySelector('input[name="role"]:checked').value; // Get the selected role from the login form

    try {
        // Sign in user with email/password
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User logged in successfully:', user.email);

        // Get a reference to the Firestore database
        const firestore = firebase.firestore();

        // Fetch user data from Firestore
        let userDoc;
        if (selectedRole === 'user') {
            userDoc = await firestore.collection('users').doc(user.uid).get();
        } else if (selectedRole === 'seller') {
            userDoc = await firestore.collection('sellers').doc(user.uid).get();
        }

        if (userDoc.exists) {
            const userData = userDoc.data();
            const userRole = userData.role;

            // Check if user role matches the selected role in the login form
            if (userRole === selectedRole) {
                // Redirect the user to index.html or any other desired page upon successful login
                window.location.href = 'index.html';
                alert('Login successful!');
            } else {
                alert('You do not have permission to access this account. Please log in with the correct role.');
            }
        } else {
            alert('User data not found. Please sign up for an account.');
        }
    } catch (error) {
        console.error('Error logging in:', error.message);

        // Check for specific error codes
        if (error.code === 'auth/user-not-found') {
            alert('User not found. Please check your email or sign up for a new account.');
        } else if (error.code === 'auth/wrong-password') {
            alert('Incorrect password. Please try again.');
        } else {
            // Handle other login errors
            alert('Login failed. Please try again.');
        }
    }
}

function openPopup() {
    window.open("passRecover.html", "Forgot Password", "width=400,height=300");
}
