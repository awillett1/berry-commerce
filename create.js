/*
// Check if Firebase app has already been initialized
if (!firebaseInstance) {
    // Fetch firebaseConfig from server and initialize Firebase
    document.addEventListener('DOMContentLoaded', async function () {
        try {
            // Fetch Firebase configuration from the server
            const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
            const firebaseConfig = await response.json();

            // Initialize Firebase with the fetched configuration
            firebaseInstance = firebase.initializeApp(firebaseConfig);

            // Continue with the rest of your code
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
        const userCredential = await firebaseInstance.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User registered successfully:', user.email);

        // Get a reference to the Firestore database
        const firestore = firebaseInstance.firestore();

        // Store user information in Firestore under the "users" collection
        await firestore.collection('users').doc(user.uid).set({
            email: email,
            role: role
        });

        // Redirect the user to index.html or any other desired page upon successful registration
        window.location.href = 'index.html';
        alert('Registration successful! You can now log in with your new account.');
        alert('Selected Role: ' + role);

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
*/


/* // MARCH 20 - WORKS BUT NO VERIFICATION CODE
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

        // Get a reference to the Firestore database
        const firestore = firebase.firestore();

        // Store user information in Firestore under the "users" collection
        await firestore.collection('users').doc(user.uid).set({
            email: email,
            role: role
        });

        // Redirect the user to index.html or any other desired page upon successful registration
        window.location.href = 'index.html';
        alert('Registration successful! You can now log in with your new account.');
        alert('Selected Role: ' + role);

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
*/

async function handleRegistration(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;
    const role = document.querySelector('input[name="role"]:checked').value; // Get the selected role

    try {
        if (role === 'seller') {
            // Only fetch and verify the verification code if the user is a seller
            const verificationCode = document.getElementById('verificationCode').value;

            // Fetch the verification code associated with the user's email from Firestore
            const verificationSnapshot = await firebase.firestore()
                .collection('verificationCodes')
                .doc(email)
                .get();

            // Check if the verification code document exists and if the provided code matches
            if (verificationSnapshot.exists && verificationSnapshot.data().code === verificationCode) {
                // Proceed with user registration
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;
                console.log('User registered successfully:', user.email);

                // Get a reference to the Firestore database
                const firestore = firebase.firestore();

                // Store user information in Firestore under the "sellers" collection
                await firestore.collection('sellers').doc(user.uid).set({
                    email: email,
                    role: role,
                    code: verificationCode
                });

                // Redirect the user to index.html or any other desired page upon successful registration
                window.location.href = 'index.html';
                alert('Registration successful! You can now log in with your new account.');
                alert('Selected Role: ' + role);
            } else {
                alert('Invalid verification code. Please try again.');
            }
        } else {
            // Proceed with user registration directly if the user is not a seller
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User registered successfully:', user.email);

            // Get a reference to the Firestore database
            const firestore = firebase.firestore();

            // Store user information in Firestore under the "users" collection
            await firestore.collection('users').doc(user.uid).set({
                email: email,
                role: role
            });

            // Redirect the user to index.html or any other desired page upon successful registration
            window.location.href = 'index.html';
            alert('Registration successful! You can now log in with your new account.');
            alert('Selected Role: ' + role);
        }
    } catch (error) {
        console.error('Error registering user:', error.message);
        // Add an alert to inform the user about the error
        alert('Error registering user: ' + error.message);
    }
}


// Function to show the registration form based on the selected role
function showRegistrationForm() {
    const roleSelection = document.querySelector('input[name="role"]:checked').value;

    // Hide all registration sections initially
    document.getElementById('roleSelectionSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';

    // Show the appropriate registration section based on the selected role
    if (roleSelection === 'seller') {
        document.getElementById('registrationSection').style.display = 'block';
        document.getElementById('verificationCodeContainer').style.display = 'block'; // Show verification code field container
    } else {
        document.getElementById('roleSelectionSection').style.display = 'block';
        document.getElementById('verificationCodeContainer').style.display = 'none'; // Hide verification code field container
    }
}

// Add event listener to the role selection form
document.getElementById('roleSelectionForm').addEventListener('submit', showRegistrationForm);

