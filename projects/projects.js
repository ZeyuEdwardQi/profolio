import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
const projectList = Array.isArray(projects) ? projects : Object.values(projects); // Convert object to array if needed
renderProjects(projectList, projectsContainer, 'h2');

// renderProjects(projects, projectsContainer, 'h2');

// // Select the title element
const projectsTitle = document.querySelector('.projects-title');

// // Function to update the project count
// function updateProjectCount(projects) {
//     if (projectsTitle) {
//         projectsTitle.textContent = `Projects (${projects.length})`;
//     }
// }

// Fetch the JSON and render projects
// let projects = fetchJSON("https://raw.githubusercontent.com/ZeyuEdwardQi/profolio/main/lib/projects.json").then(projects => {
//     console.log("✅ Checking projects:", projects);  // Debugging line
//     console.log("🔍 Type of projects:", typeof projects); // Check type
//     if (!Array.isArray(projects)) {
//         console.error("❌ Error: projects is NOT an array", projects);
//         return; // Stop execution if projects is not an array
//     }

//     const container = document.querySelector(".projects");
//     if (container) {
//         container.innerHTML = ""; // Clear previous content
//         projects.forEach(project => renderProjects(project, container));
//         updateProjectCount(projects); // Update count in the title
//     }
// });

// let projects = await fetchJSON("../lib/projects.json");

// Function to update the project count
function updateProjectCount(projects) {
    if (projectsTitle) {
        projectsTitle.textContent = `Projects (${projects.length})`;
    }
}

console.log("✅ projects.js is loaded!");
console.log("Checking fetchJSON:", fetchJSON);
console.log("Checking renderProjects:", renderProjects);