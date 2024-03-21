/* WORKS - MARCH 20
// create.js 
document.addEventListener('DOMContentLoaded', function () {
    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', showRegistrationForm);
});

async function showRegistrationForm() {
    const selectedRole = document.querySelector('input[name="role"]:checked').value;

    // Hide the role selection form
    const roleSelectionSection = document.getElementById('roleSelectionSection');
    roleSelectionSection.style.display = 'none';

    // Display the registration form
    const registrationSection = document.getElementById('registrationSection');
    registrationSection.style.display = 'block';

    // Transfer the selected role to the registration form
    const userRoleInput = document.getElementById('userRole');
    userRoleInput.value = selectedRole;

    // Show/hide verification code field based on selected role
    const verificationCodeContainer = document.getElementById('verificationCodeContainer');
    if (selectedRole === 'user') {
        verificationCodeContainer.style.display = 'none';
    } else {
        verificationCodeContainer.style.display = 'block';
    }
}
async function handleRegistration(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;
    const selectedRole = document.getElementById('userRole').value;

    try {
        // Register user with email/password
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User registered successfully:', user.email);

        // Get a reference to the Firestore database
        const firestore = firebase.firestore();

        // Store user data in Firestore
        await firestore.collection('users').doc(user.uid).set({
            email: email,
            role: selectedRole,
            // Add other user data if needed
        });

        // Redirect the user to index.html or any other desired page upon successful registration
        window.location.href = 'index.html';
        alert('Registration successful!');
        alert('You have successfully registered for a ' + selectedRole + ' account ' + email + '.');
    } catch (error) {
        console.error('Error registering user:', error);

        // Handle registration errors
        if (error.code === 'auth/email-already-in-use') {
            alert('Email address is already in use. Please use a different email or log in.');
        } else {
            alert('Registration failed. Please try again.');
        }
    }
}

// Add event listener for registration form submission
const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', handleRegistration);
*/

document.addEventListener('DOMContentLoaded', function () {
    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', showRegistrationForm);
});

async function showRegistrationForm() {
    const selectedRole = document.querySelector('input[name="role"]:checked').value;

    // Hide the role selection form
    const roleSelectionSection = document.getElementById('roleSelectionSection');
    roleSelectionSection.style.display = 'none';

    // Display the registration form
    const registrationSection = document.getElementById('registrationSection');
    registrationSection.style.display = 'block';

    // Transfer the selected role to the registration form
    const userRoleInput = document.getElementById('userRole');
    userRoleInput.value = selectedRole;

    // Show/hide verification code field based on selected role
    const verificationCodeContainer = document.getElementById('verificationCodeContainer');
    if (selectedRole === 'user') {
        verificationCodeContainer.style.display = 'none';
    } else {
        verificationCodeContainer.style.display = 'block';
    }
}

async function handleRegistration(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;
    const selectedRole = document.getElementById('userRole').value;

    try {
        if (selectedRole === 'seller') {
            const verificationCode = document.getElementById('verificationCode').value;
            const verificationDoc = await firebase.firestore().collection('verificationCodes').doc(email).get();
            
            if (!verificationDoc.exists || verificationDoc.data().code !== verificationCode) {
                alert('Verification code is incorrect. Registration failed.');
                return;
            }
        }

        // Register user with email/password
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User registered successfully:', user.email);

        // Get a reference to the Firestore database
        const firestore = firebase.firestore();

        // Store user data in Firestore
        if (selectedRole === 'user') {
            await firestore.collection('users').doc(user.uid).set({
                email: email,
                role: selectedRole,
                // Add other user data if needed
            });
        } else if (selectedRole === 'seller') {
            await firestore.collection('sellers').doc(email).set({
                email: email,
                role: selectedRole,
                verificationCode: verificationCode,
                id: user.uid
                // Add other seller data if needed
            });
        }

        // Redirect the user to index.html or any other desired page upon successful registration
        window.location.href = 'index.html';
        alert('Registration successful!');
        alert('You have successfully registered for a ' + selectedRole + ' account ' + email + '.');
    } catch (error) {
        console.error('Error registering user:', error);

        // Handle registration errors
        if (error.code === 'auth/email-already-in-use') {
            alert('Email address is already in use. Please use a different email or log in.');
        } else {
            alert('Registration failed. Please try again.');
        }
    }
}
