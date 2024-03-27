

async function changeEmail() {
    var newEmail = document.getElementById('newEmail').value;
    var user = firebase.auth().currentUser;

    console.log("Current user:", user);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.uid;
            console.log("User ID:", userId);
        } else {
            console.error("No user signed in (inner loop)");
        }
    });
    

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

// Function to update email in 'users' collection
async function updateUserEmail(userId, newEmail) {
    return firebase.firestore().collection('users').doc(userId).update({
        email: newEmail
    });
}

// Function to update email in 'sellers' collection
async function updateSellerEmail(userId, newEmail) {
    return firebase.firestore().collection('sellers').doc(userId).update({
        email: newEmail
    });
}


document.addEventListener('DOMContentLoaded', function() {
    window.changeEmail = changeEmail;
});
