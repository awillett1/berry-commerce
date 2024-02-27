    document.addEventListener('DOMContentLoaded', async function () {
        // Fetch firebaseConfig from server
        try {
            const response = await fetch('https://berry-commerce-default-rtdb.firebaseio.com/appConfigurations/firebaseConfig.json');
            const firebaseConfig = await response.json();
    
            // Initialize Firebase with the fetched configuration
            firebase.initializeApp(firebaseConfig);
    
            // Attach event listener to the registration form
            const registrationForm = document.getElementById('registrationForm');
            registrationForm.addEventListener('submit', handleRegistration);
    
        } catch (error) {
            console.error('Error fetching firebaseConfig:', error);
        }
    });
    
    async function handleRegistration(event) {
        event.preventDefault(); // Prevent form submission
    
        const email = document.getElementById('registrationEmail').value;
        const password = document.getElementById('registrationPassword').value;
    
        // Create a new user with email/password
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User registered successfully:', user.email);
    
            // Redirect the user to index.html or any other desired page upon successful registration
            window.location.href = 'index.html';
            alert('Registration successful! You can now log in with your new account.');
    
        } catch (error) {
            console.error('Error registering user:', error.message);
            // Handle registration errors, e.g., display an error message to the user
        }
    }
