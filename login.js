document.addEventListener('DOMContentLoaded', function () {
    // Fetch firebaseConfig from server
    fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json')
        .then(response => response.json())
        .then(firebaseConfig => {
            // Initialize Firebase with the fetched configuration
            firebase.initializeApp(firebaseConfig);
        // Attach event listener to the login form
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', handleLogin);

        })
        .catch(error => {
        console.error('Error fetching firebaseConfig:', error);
        });
});

function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    // Sign in user with email/password
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('User logged in successfully:', user.email);

            window.location.href = 'index.html'
        })
        .catch(error => {
            console.error('Error logging in:', error.message);
            // Handle login errors, e.g., display an error message to the user
        });
}
