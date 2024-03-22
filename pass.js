async function checkEmail() {
    const email = document.getElementById('emailForgot').value;

    try {
        // Check if the email exists in the 'users' collection
        const userDoc = await firebase.firestore().collection('users').where('email', '==', email).get();

        if (!userDoc.empty) {
            // Email exists in 'users' collection
            // Send password reset email
            await firebase.auth().sendPasswordResetEmail(email);
            alert("Password reset email sent. Please check your inbox.");
        } else {
            // Check if the email exists in the 'sellers' collection
            const sellerDoc = await firebase.firestore().collection('sellers').where('email', '==', email).get();

            if (!sellerDoc.empty) {
                // Email exists in 'sellers' collection
                // Send password reset email
                await firebase.auth().sendPasswordResetEmail(email);
                alert("Password reset email sent. Please check your inbox.");
            } else {
                // Email does not exist in either collection
                alert("Email not found. Please enter a valid email address.");
            }
        }
    } catch (error) {
        console.error("Error checking email:", error);
        alert("An error occurred while checking the email. Please try again later.");
    }
}
