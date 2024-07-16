const fetch = require('node-fetch');

async function getGitHubUser() {
  const username = 'vineettiwari22071991';  // Replace with the username you want to fetch
  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return `GitHub User: ${data.login}, Bio: ${data.bio}`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

getGitHubUser().then(result => {
  console.log(result);
  process.exit(0);  // Exit the process to ensure the script completes
});
