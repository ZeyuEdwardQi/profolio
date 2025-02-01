// import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

// const projects = await fetchJSON('./lib/projects.json');
// const latestProjects = projects.slice(0, 3);

// const projectsContainer = document.querySelector('.projects');

// <div class="projects"></div>

// renderProjects(latestProjects, projectsContainer, 'h2');

// const githubData = await fetchGitHubData('giorgianicolaou');

// const profileStats = document.querySelector('#profile-stats');

// if (profileStats) {
//     profileStats.innerHTML = `
//           <dl>
//             <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
//             <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
//             <dt>Followers:</dt><dd>${githubData.followers}</dd>
//             <dt>Following:</dt><dd>${githubData.following}</dd>
//           </dl>
//       `;
// }

import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

// Load projects
const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector('.projects');
renderProjects(latestProjects, projectsContainer, 'h2');

// Load GitHub stats
const githubData = await fetchGitHubData('ZeyuEdwardQi'); // Use your GitHub username

const profileStats = document.querySelector('#profile-stats');

if (profileStats) {
    profileStats.innerHTML = `
          <h2>My GitHub Stats</h2>
          <dl>
            <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
            <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
            <dt>Followers:</dt><dd>${githubData.followers}</dd>
            <dt>Following:</dt><dd>${githubData.following}</dd>
          </dl>
      `;
}
