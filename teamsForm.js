// teamsForm

// Function to handle form submission
document.addEventListener('DOMContentLoaded', function() {
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const teamName = document.getElementById('teamName').value;
    const teamDescription = document.getElementById('teamDescription').value;
    const teamImage = document.getElementById('teamImage').value; // File input, needs further handling
    const teamMembers = document.getElementById('teamMembers').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const etsy = document.getElementById('etsy').value;

    // Create team section HTML
    const teamSection = `
      <section class="container my-5">
        <div class="text-center mb-5">
          <h2>${teamName}</h2>
        </div>
        <div class="row">
          <div class="col-md-6">
            <img src="${teamImage}" class="img-fluid rounded-circle mb-4" alt="${teamName}">
          </div>
          <div class="col-md-6">
            <h3>${teamName}</h3>
            <p class="lead">${teamDescription}</p>
            <ul class="list-unstyled">
              ${teamMembers.split('\n').map(member => `<li>${member}</li>`).join('')}
            </ul>
            <div class="contact-info">
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Etsy:</strong> <a href="${etsy}" target="_blank">${etsy}</a></p>
            </div>
          </div>
        </div>
      </section>
    `;

    // Insert team section into the page
    document.getElementById('teamSection').innerHTML = teamSection;
  }

  // Add event listener to the form for form submission
  // document.getElementById('teamForm').addEventListener('submit', handleFormSubmission);
  document.getElementById('submitButton').addEventListener('click', handleFormSubmission);
});