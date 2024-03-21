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

// seller.js 

// Function to show registration form and pass role
function showRegistrationForm() {
    const role = document.querySelector('input[name="role"]:checked').value;
    document.getElementById('roleSelectionSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'block';
    document.getElementById('userRole').value = role;
    if (role === 'seller') {
      document.getElementById('verificationCodeContainer').style.display = 'block';
    } else {
      document.getElementById('verificationCodeContainer').style.display = 'none';
    }
  }

  // Registration Form Submission
  document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;
    const role = document.getElementById('userRole').value;

    if (role === 'seller') {
      const verificationCode = document.getElementById('verificationCode').value;
      // Check if verification code matches
      db.collection('verificationCodes').doc(email).get()
        .then(doc => {
          if (doc.exists && doc.data().code === verificationCode) {
            // Register seller
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {
                // Save seller data to Firestore
                db.collection('sellers').doc(email).set({
                  email: email,
                  role: role,
                  verificationCode: verificationCode,
                  userId: userCredential.user.uid
                })
                .then(() => {
                  alert('Seller registered successfully!');
                  window.location.href = 'login.html';
                })
                .catch(error => console.error('Error adding seller to Firestore: ', error));
              })
              .catch((error) => {
                alert(error.message);
              });
          } else {
            alert('Invalid verification code.');
          }
        })
        .catch(error => console.error('Error getting verification code: ', error));
    } else {
      // Register user
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Save user data to Firestore
          db.collection('users').doc(email).set({
            email: email,
            role: role,
            userId: userCredential.user.uid
          })
          .then(() => {
            alert('User registered successfully!');
            window.location.href = 'login.html';
          })
          .catch(error => console.error('Error adding user to Firestore: ', error));
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  });