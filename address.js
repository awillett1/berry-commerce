function addEventListeners() {
    document.getElementById('userIcon').addEventListener('click', function(event) {
        event.preventDefault();
        checkLoginAndRedirect();
    });
}

function checkLoginAndRedirect() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            const firestore = firebase.firestore();
            const userRef = firestore.collection('users').doc(user.uid);

            userRef.get().then(function(doc) {
                if (doc.exists) {
                    const userData = doc.data();
                    const userRole = userData.role;

                    // Redirect to appropriate page based on user role
                    if (userRole === 'user') {
                        window.location.href = 'account.html';
                    } else if (userRole === 'seller') {
                        window.location.href = 'seller.html';
                    }
                } else {
                    console.log('No user data found!');
                    // Handle case where user data does not exist

                }
            }).catch(function(error) {
                console.log('Error getting user data:', error);
            });
        } else {
            // No user is signed in
            window.location.href = 'login.html';
        }
    });
}
