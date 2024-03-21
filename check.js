  // Function to execute when Firebase is initialized
// Function to execute when Firebase is initialized
function initFirebaseAndCheckRole() {
    // Check if user is signed in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            checkUserRole(user);
        } else {
            // User is not signed in, redirect to login.html
            window.location.href = "login.html";
        }
    });

    function checkUserRole(user) {
        // Get user's role from Firestore or any other database
        // For demonstration, assuming user's role is stored in a field named 'role'
        firebase.firestore().collection("users").doc(user.uid).get().then(function(doc) {
            if (doc.exists) {
                var role = doc.data().role;
                // Determine the current page's URL
                var currentPage = window.location.pathname;

                // Redirect user based on their role and the current page's URL
                if ((role === "seller" && currentPage.includes("seller.html")) ||
                    (role === "user" && currentPage.includes("account.html"))) {
                    // Show the content
                    showContent();
                } else {
                    // Redirect to 404 page
                    window.location.href = "404.html";
                }
            } else {
                console.log("User does not exist.");
                // Redirect to 404 page
                window.location.href = "404.html";
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            // Redirect to 404 page
            window.location.href = "404.html";
        });
    }
}

    function showContent() {
    // Show the content of the page
        document.getElementById("content").style.display = "block";
    }
  