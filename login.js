document.addEventListener('DOMContentLoaded', async function () {
    // Fetch firebaseConfig from server
    try {
        const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
        const firebaseConfig = await response.json();

        // Initialize Firebase with the fetched configuration
        firebase.initializeApp(firebaseConfig);

        // Attach event listener to the login form
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', handleLogin);

    } catch (error) {
        console.error('Error fetching firebaseConfig:', error);
    }
});

async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Sign in user with email/password
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User logged in successfully:', user.email);

        // Redirect the user to index.html or any other desired page upon successful login
        window.location.href = 'index.html';
        alert('Login successful! Thank you ', user.email);

    } catch (error) {
        console.error('Error logging in:', error.message);
        // Handle login errors, e.g., display an error message to the user
    }
}
        