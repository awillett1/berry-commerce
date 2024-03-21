// Function to execute when Firebase is initialized
function initFirebaseAndExecute() {
    document.addEventListener("DOMContentLoaded", function() {
      // Check if user is signed in
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              // User is signed in
              checkUserRole(user);
          } else {
              // User is not signed in, redirect to login.html
              window.location.href = "login.html";
              alert("You need to be signed in to access this page.");
          }
      });

      function checkUserRole(user) {
          // Get user's role from Firestore or any other database
          // For demonstration, assuming user's role is stored in a field named 'role'
          firebase.firestore().collection("users").doc(user.uid).get().then(function(doc) {
              if (doc.exists) {
                  var role = doc.data().role;
                  // Redirect user based on their role
                  if (role === "seller") {
                      // Seller should not access account.html
                      alert("You are a seller. You cannot access user account settings.");
                      window.location.href = "404.html";
                  } else if (role === "user") {
                      alert("You are a user. You cannot access seller account settings.");
                      window.location.href = "404.html";
                  } else {
                      // Handle unknown roles
                      console.log("Unknown role");
                  }
              } else {
                  console.log("User does not exist.");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
      }
    });
  }

  // Execute the function when Firebase is ready
  firebaseInit().then(initFirebaseAndExecute);