// check.js

function checkLoginAndRedirect() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            const firestore = firebase.firestore();
            const userRef = firestore.collection('users').doc(user.uid);
            const sellerRef = firestore.collection('sellers').doc(user.uid);

            // Check if user data exists in the 'users' collection
            userRef.get().then(function(userDoc) {
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    const userRole = userData.role;
                    // Redirect to appropriate page based on user role
                    if (userRole === 'user') {
                        window.location.href = 'account.html';
                    } else if (userRole === 'seller') {
                        // Check if user is a seller before redirecting to 'account.html'
                        checkIfSeller(user.uid);
                    }
                } else {
                    // Check if user data exists in the 'sellers' collection
                    sellerRef.get().then(function(sellerDoc) {
                        if (sellerDoc.exists) {
                            // Redirect to 'seller.html' only if sellerDoc exists
                            window.location.href = 'seller.html';
                        } else {
                            console.log('No user or seller data found!');
                            // Handle case where neither user nor seller data exists
                            // Redirect to 'login.html' as a fallback
                            window.location.href = 'login.html';
                        }
                    }).catch(function(error) {
                        console.log('Error getting seller data:', error);
                    });
                }
            }).catch(function(error) {
                console.log('Error getting user data:', error);
            });
        } else {
            // No user is signed in
            // Redirect to 'login.html' as user is not signed in
            window.location.href = 'login.html';
        }
    });
}

function checkIfSeller(uid) {
    const firestore = firebase.firestore();
    const sellerRef = firestore.collection('sellers').doc(uid);
    sellerRef.get().then(function(sellerDoc) {
        if (sellerDoc.exists) {
            // Seller exists, prevent access to 'account.html'
            alert('You do not have permission to access this account.');
            // Redirect to 'seller.html' or any other appropriate page
            window.location.href = 'seller.html';
        } else {
            // Seller does not exist, redirect to 'account.html'
            window.location.href = 'account.html';
        }
    }).catch(function(error) {
        console.log('Error getting seller data:', error);
    });
}
