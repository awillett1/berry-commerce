// Function to reset email and send verification email
async function changeEmail() {
    const newEmail = document.getElementById('newEmail').value;
    const user = firebase.auth().currentUser;

    try {
        // Check if the user is signed in
        if (user) {
            // Update the email address
            await user.updateEmail(newEmail);

            // Send email verification
            await user.sendEmailVerification();

            // Update 'users' collection
            await firebase.firestore().collection('users').doc(user.uid).update({
                email: newEmail
            });

            // Update 'sellers' collection
            await firebase.firestore().collection('sellers').where('userId', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        doc.ref.update({ email: newEmail });
                    });
                });

            alert("Email reset successfully. Please check your inbox for a verification email.");
        } else {
            alert("No user signed in.");
        }
    } catch (error) {
        console.error("Error resetting email:", error);
        alert("An error occurred while resetting the email. Please try again later.");
    }
}
