document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission
    function handleFormSubmission(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get form data
      const teamName = document.getElementById('teamName').value;
      const teamDescription = document.getElementById('teamDescription').value;
      const teamMembers = document.getElementById('teamMembers').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const etsy = document.getElementById('etsy').value;
  
      // Save team data to Firestore
      firebase.firestore().collection("teams").add({
        teamName: teamName,
        teamDescription: teamDescription,
        teamMembers: teamMembers,
        email: email,
        phone: phone,
        etsy: etsy
      })
      .then((docRef) => {
        console.log("Team added with ID: ", docRef.id);
        // Optionally, you can redirect the user to another page after adding the team
        alert("Team successfully added.");
      })
      .catch((error) => {
        console.error("Error adding team: ", error);
      });
    }
  
    // Add event listener to the submit button for form submission
    const submitButton = document.getElementById('submitButton');
    if (submitButton) { // Check if submitButton exists
      submitButton.addEventListener('click', handleFormSubmission);
    } else {
      console.error("Submit button not found.");
    }
  });
  