// Function to handle email change
function changeEmail(newEmail) {
    var user = firebase.auth().currentUser;
  
    if (user) {
      user.updateEmail(newEmail).then(function() {
        // Update email in 'users' collection
        updateUserEmail(user.uid, newEmail)
          .then(function() {
            console.log("User email updated successfully.");
            alert("Your email has been successfuly updated, your new email is", newEmail);
  
            // Update email in 'sellers' collection
            updateSellerEmail(user.uid, newEmail)
              .then(function() {
                console.log("Seller email updated successfully.");
                alert("Your email has been successfuly updated, your new email is", newEmail);
              })
              .catch(function(error) {
                console.error("Error updating seller email:", error);
              });
          })
          .catch(function(error) {
            alert("Email could not update.")
            console.error("Error updating user email:", error);
          });
      }).catch(function(error) {
        alert("Email could not update.")
        console.error("Error updating email:", error);
      });
    } else {
      console.error("No user signed in.");
    }
  }
  