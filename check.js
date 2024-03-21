// check.js

document.addEventListener("DOMContentLoaded", function() {
    firebaseInit().then(function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in
                const firestore = firebase.firestore();
                const userRef = firestore.collection('users').doc(user.uid);
                const sellerRef = firestore.collection('sellers').doc(user.uid);

                userRef.get().then(function(userDoc) {
                    if (userDoc.exists) {
                        // User is a 'user'
                        if (window.location.pathname.includes("seller.html")) {
                            alert("You do not have permission to access this page.");
                            window.location.href = "404.html";
                        }
                    } else {
                        // User is a 'seller'
                        sellerRef.get().then(function(sellerDoc) {
                            if (sellerDoc.exists) {
                                if (window.location.pathname.includes("account.html")) {
                                    alert("You do not have permission to access this page.");
                                    window.location.href = "404.html";
                                }
                            }
                        }).catch(function(error) {
                            console.log("Error getting seller document:", error);
                        });
                    }
                }).catch(function(error) {
                    console.log("Error getting user document:", error);
                });
            } else {
                // No user is signed in
                if (window.location.pathname.includes("seller.html") || window.location.pathname.includes("account.html")) {
                    alert("You need to sign in to access this page.");
                    window.location.href = "404.html";
                }
            }
        });
    }).catch(function(error) {
        console.error('Error initializing Firebase:', error);
        // Handle errors, e.g., prevent further execution or show an error message
    });
});
