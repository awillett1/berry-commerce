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
