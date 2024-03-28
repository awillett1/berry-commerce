// Function to fetch teams data from Firestore and update the page
async function updateTeamsPage() {
  const teamsContainer = document.getElementById('teamsContainer');
  
  // Log to indicate that the function is called
  console.log('Updating teams page...');

  // Clear existing content
  teamsContainer.innerHTML = '';

  // Fetch teams data from Firestore
  firebase.firestore().collection("teams").get()
  .then((querySnapshot) => {
      console.log('Data fetched successfully.');

      querySnapshot.forEach((doc) => {
          const teamData = doc.data();
          const teamName = teamData.teamName;
          
          // Log the team name for each team
          console.log('Team Name:', teamName);

          // Create team card HTML
          const teamCard = `
              <div class="col-lg-6">
                  <div class="team-box border rounded p-4 mb-4">
                      <img src="img/avatar.jpg" alt="${teamName}" class="team-img mb-3">
                      <h2 class="mb-3">${teamName}</h2>
                      <a class="btn border-secondary rounded-pill py-2 px-4" href="home/teams.html/${teamName}.html">Explore</a>
                  </div>
              </div>
          `;

          // Append team card to teamsContainer
          teamsContainer.innerHTML += teamCard;
      });
  })
  .catch((error) => {
      // Log and handle errors
      console.error("Error fetching teams: ", error);
      // Display an error message on the page
      teamsContainer.innerHTML = '<p>Error fetching teams. Please try again later.</p>';
  });
}

// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Call the updateTeamsPage function when the document is loaded
  updateTeamsPage();
});
