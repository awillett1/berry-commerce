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
            const registrationForm = document.getElementById('registrationForm');
            registrationForm.addEventListener('submit', handleRegistration);

        } catch (error) {
            console.error('Error fetching or initializing Firebase:', error);
            // Handle errors, e.g., prevent further execution or show an error message
        }
    });
}

async function handleRegistration(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;
    const role = document.querySelector('input[name="role"]:checked').value; // Get the selected role

    try {
        // Create a new user with email/password
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User registered successfully:', user.email);

        // Store user information in Firestore (adjust the path to match your Firestore structure)
        await firestore.collection('users').doc('users').collection(user.uid).set({
            email: user.email,
            role: role,
        });

        // Redirect the user to index.html or any other desired page upon successful registration
        window.location.href = 'index.html';
        alert('Registration successful! You can now log in with your new account.');

    } catch (error) {
        console.error('Error registering user:', error.message);

        // Check if the error is due to an existing email address
        if (error.code === 'auth/email-already-in-use') {
            alert('This email address is already in use. Please use a different email or log in.');
        } else {
            // Handle other registration errors
            alert('Registration failed. Please try again.');
        }
    }
}

function showRegistrationForm() {
    // Toggle the display of the registration section
    document.getElementById('roleSelectionForm').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'block';
}

    