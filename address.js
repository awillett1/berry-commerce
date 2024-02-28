
// Sends users to right account information section depending on if user is seller or buyer.
document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is authenticated
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in, check their role
            checkUserRole(user.uid);
        } else {
            // User is not signed in, redirect to login page or handle as needed
            window.location.href = 'login.html';
        }
    });
});

async function checkUserRole(userId) {
    try {
        // Fetch user data from Firestore
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
            const userRole = userDoc.data().role;

            // Redirect based on user role
            if (userRole === 'user') {
                window.location.href = 'account.html';
            } else if (userRole === 'seller') {
                window.location.href = 'seller.html';
            } else {
                // Handle unexpected role (optional)
                alert('Invalid role. Please contact support.');
                // Redirect to a default page or handle as needed
                window.location.href = 'default.html';
            }
        } else {
            // Handle user data not found (optional)
            alert('User data not found. Please contact support.');
            // Redirect to a default page or handle as needed
            window.location.href = 'default.html';
        }
    } catch (error) {
        console.error('Error checking user role:', error.message);
        // Handle errors (optional)
        alert('Error checking user role. Please try again or contact support.');
        // Redirect to a default page or handle as needed
        window.location.href = 'default.html';
    }
}