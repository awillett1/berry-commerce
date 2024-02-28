document.addEventListener('DOMContentLoaded', async function () {
    // Fetch firebaseConfig from server
    try {
        const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
        const firebaseConfig = await response.json();

        // Initialize Firebase with the fetched configuration
        firebase.initializeApp(firebaseConfig);

        const firestore = firebase.firestore();

        // Attach event listener to the login form
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', handleLogin);

    } catch (error) {
        console.error('Error fetching firebaseConfig:', error);
    }
});

async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    // Sign in user with email/password
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User logged in successfully:', user.email);

        // Redirect the user to index.html or any other desired page upon successful login
        window.location.href = 'index.html';
        alert('Login successful! Thank you ' + user.email);

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
