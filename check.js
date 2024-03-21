// Function to execute when Firebase is initialized
function initFirebaseAndCheckRole() {
    // Check if user is signed in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            console.log("User is signed in.");
            checkUserRole(user);
        } else {
            // User is not signed in, redirect to login.html
            console.log("User is not signed in.");
            window.location.href = "login.html";
        }
    });

    function checkUserRole(user) {
        // Get user's role from Firestore or any other database
        // For demonstration, assuming user's role is stored in a field named 'role'
        firebase.firestore().collection("users").doc(user.uid).get().then(function(doc) {
            if (doc.exists) {
                var role = doc.data().role;
                console.log("Role:", role);
                // Determine the current page's URL
                var currentPage = window.location.pathname;
                console.log("Current Page:", currentPage);

                console.log("Checking roles...");
                if ((role === "seller" && currentPage.includes("account.html")) ||
                    (role === "user" && currentPage.includes("seller.html"))) {
                    // User is NOT authorized to access the current page, show the content
                    console.log("Not authorized, not showing content.");
                    alert("You are not authorized to access this page as a", role);
                    document.getElementById("content").style.display = "none";
                    window.location.href = "404.html";
                } 
                if ((role === "seller" && currentPage.includes("seller.html")) ||
                (role === "user" && currentPage.includes("account.html"))){
                    // User is authorized to access the current page, show the content
                    console.log("Authorized, showing content");
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
