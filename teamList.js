
  // Function to fetch teams data from Firestore and update the page
  document.addEventListener('DOMContentLoaded', function() {
  function updateTeamsPage() {
    const teamsContainer = document.getElementById('teamsContainer');

    // Clear existing content
    teamsContainer.innerHTML = '';

    // Fetch teams data from Firestore
    firebase.firestore().collection("teams").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const teamData = doc.data();
        const teamName = teamData.teamName;

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
      console.error("Error fetching teams: ", error);
  });
}

// Call updateTeamsPage when the document is loaded
document.addEventListener('DOMContentLoaded', updateTeamsPage);
});