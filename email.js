async function changeEmail() {
    var newEmail = document.getElementById('newEmail').value;
    var user = firebase.auth().currentUser;

    console.log("Current user:", user);

    if (user) {
        user.updateEmail(newEmail).then(function() {
            console.log("Email update successful");

            // Update email in 'users' collection
            updateUserEmail(user.uid, newEmail)
                .then(function() {
                    console.log("User email updated successfully.");
                    alert("Your email has been successfully updated. Your new email is " + newEmail);

                    // Update email in 'sellers' collection
                    updateSellerEmail(user.uid, newEmail)
                        .then(function() {
                            console.log("Seller email updated successfully.");
                            alert("Your email has been successfully updated. Your new email is " + newEmail);
                        })
                        .catch(function(error) {
                            console.error("Error updating seller email:", error);
                        });
                })
                .catch(function(error) {
                    console.error("Error updating user email:", error);
                    alert("Your email was unable to be updated.");
                });
        }).catch(function(error) {
            console.error("Error updating email:", error);
            alert("Your email was unable to be updated.");
        });
    } else {
        console.error("No user signed in.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.changeEmail = changeEmail;
});
