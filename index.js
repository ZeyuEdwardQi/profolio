import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';
const projectsContainer = document.querySelector('.projects');

// ✅ Fetch projects and slice the latest 3
fetchJSON('./lib/projects.json').then(projects => {
    console.log("✅ Checking projects:", projects); // Debugging
    console.log("🔍 Type of projects:", typeof projects); 

    if (!Array.isArray(projects)) {
        console.error("❌ Error: projects is NOT an array", projects);
        return;
    }

    const latestProjects = projects.slice(0, 3); // Take first 3 projects
    renderProjects(latestProjects, projectsContainer, 'h2'); // Render them
});

// Function to load projects
async function loadProjects() {
    try {
        const projects = await fetchJSON('./lib/projects.json');
        
        if (!projects || !Array.isArray(projects)) {
            console.error("⚠️ Error: Projects data is not an array.");
            return;
        }

        const latestProjects = projects.slice(0, 3);
        const projectsContainer = document.querySelector('.projects');

        if (projectsContainer) {
            renderProjects(latestProjects, projectsContainer, 'h2');
        } else {
            console.error("⚠️ Error: .projects container not found.");
        }
    } catch (error) {
        console.error("🚨 Error loading projects:", error);
    }
}

const githubData = await fetchGitHubData('ZeyuEdwardQi');
console.log("Github Data", githubData)

const profileStats = document.querySelector('#profile-stats')
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

// Load data when the page loads
document.addEventListener("DOMContentLoaded", async () => {
    await loadProjects();
    await loadGitHubStats();
});
