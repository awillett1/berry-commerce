
// Function to execute when Firebase is initialized
function initFirebaseAndCheckRole() {
    // Check if user is signed in
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("Firebase Authentication : check.js")
        if (user) {
            // User is signed in
            checkUserRole(user);
        } else {
            // User is not signed in, redirect to login.html
            console.log("Redirecting to login.html (User is not signed in)")
            window.location.href = "login.html";
        }
    });

    function checkUserRole(user) {
        // Get user's role from Firestore or any other database
        // For demonstration, assuming user's role is stored in a field named 'role'
        firebase.firestore().collection("users").doc(user.uid).get().then(function(doc) {
            console.log("Checking for user doc")
            if (doc.exists) {
                var role = doc.data().role;
                // Determine the current page's URL
                var currentPage = window.location.pathname;
                console.log("Storing current page")

                // Redirect user based on their role and the current page's URL
                if ((role === "seller" && currentPage.includes("seller.html")) ||
                    (role === "user" && currentPage.includes("account.html"))) {
                    // Show the content
                    showContent();
                    console.log("Showing content (logged in)")
                } else {
                    // Redirect to 404 page
                    window.location.href = "404.html";
                    console.log("Redirecting to 404.html ...")
                }
            } else {
                console.log("User does not exist.");
                // Redirect to 404 page
                window.location.href = "404.html";
                console.log("Redirecting to 404.html ...")
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            // Redirect to 404 page
            window.location.href = "404.html";
            console.log("Redirecting to 404.html ...")
        });
    }
}

    function showContent() {
    // Show the content of the page
        document.getElementById("content").style.display = "block";
    }
  