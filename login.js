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

            const loginForm = document.getElementById('loginForm');
            loginForm.addEventListener('submit', handleLogin);

        } catch (error) {
            console.error('Error fetching or initializing Firebase:', error);
            // Handle errors, e.g., prevent further execution or show an error message
        }
    });
}

async function handleLogin(event) {
    // const firestore = firebase.firestore();
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;
   //  const role = document.querySelector('input[name="role"]:checked').value; // Get the selected role

    try {
        // Sign in user with email/password
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User logged in successfully:', user.email);


        // Redirect the user to index.html or any other desired page upon successful registration
        window.location.href = 'index.html';
        alert('Login successful!', user.email);

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
