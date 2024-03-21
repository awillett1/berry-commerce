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
          // Redirect user based on their role
          if (role === "seller" && window.location.pathname.includes("seller.html")) {
            // User is a seller and accessing seller.html, show the content
            showContent();
          } else if (role === "user" && window.location.pathname.includes("account.html")) {
            // User is a user and accessing account.html, show the content
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

    function showContent() {
      // Show the content of the page
      document.getElementById("content").style.display = "block";
    }
  }