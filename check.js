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
                console.log("Current Page:", currentPage);

                // Check if user is trying to access unauthorized pages
                if ((role === "seller" && currentPage.includes("account.html")) ||
                    (role === "user" && currentPage.includes("seller.html"))) {
                    // Redirect to 404 page
                    window.location.href = "404.html";
                } else {
                    // User is authorized to access the current page, show the content
                    document.getElementById("content").style.display = "block";
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

