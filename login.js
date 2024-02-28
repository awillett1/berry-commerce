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

      

        // Fetch user data from Firestore (adjust the path to match your Firestore structure)
        /* const userDoc = await firestore.collection('users').doc('users').collection(user.uid).get();

        if (userDoc.docs.length > 0) {
            // Assuming there is at least one document in the collection
            const userData = userDoc.docs[0].data();
            const userRole = userData.role;

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
        } */

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
