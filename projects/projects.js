import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";


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



let svg = d3.select("svg");

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let arc = arcGenerator({
    startAngle: 0,
    endAngle: 2 * Math.PI,
  });

// d3.select('svg').append('path').attr('d', arc).attr('fill', 'red');

// let data = [1, 2];
// let data = [1, 2, 3, 4, 5, 5];
// let data = [
//     { value: 1, label: 'apples' },
//     { value: 2, label: 'oranges' },
//     { value: 3, label: 'mangos' },
//     { value: 4, label: 'pears' },
//     { value: 5, label: 'limes' },
//     { value: 5, label: 'cherries' },
//   ];

let rolledData = d3.rollups(
    projects,
    (v) => v.length, // Count projects per year
    (d) => d.year // Group by year
);

let data = rolledData.map(([year, count]) => {
    return { value: count, label: year };
  });

let sliceGenerator = d3.pie().value((d) => d.value);

// let total = 0;
let total = data.reduce((sum, d) => sum + d.value, 0);

// for (let d of data) {
//   total += d;
// }

// let colors = ['gold', 'purple'];
let colors = d3.scaleOrdinal(d3.schemeTableau10);

// let angle = 0;

// let arcData = [];

// for (let d of data) {
//   let endAngle = angle + (d / total) * 2 * Math.PI;
//   arcData.push({ startAngle: angle, endAngle });
//   angle = endAngle;
// }

// let arcs = sliceGenerator.map((d) => arcGenerator(d));

// arcs.forEach((arc, i) => {
//     svg.append("path")
//       .attr("d", arc)  // Set the shape
//       .attr("fill", i === 0 ? "blue" : "green");  // Use different colors
//   });
// arcs.forEach((arc, idx) => {
//     d3.select("#projects-pie-plot")
//       .append("path")
//       .attr("d", arc)  // Set shape
//       .attr("fill", colors(data[idx].label));  // Use colors array
// });

// let svg = d3.select("#projects-pie-plot");

// Bind data and create paths
svg.selectAll("path")
    .data(sliceGenerator(data))  // ✅ Correctly calls sliceGenerator with data
    .enter()
    .append("path")
    .attr("d", arcGenerator)  // ✅ Passes the arcGenerator function
    .attr("fill", d => colors(d.data.label)); 

    let legend = d3.select('.legend');

data.forEach((d, idx) => {
    legend.append('li')
            .attr('style', `--color:${colors(idx)}`)
            .attr('class', 'legend-item')  // Add class to style in CSS
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
});
    

// let query = '';
// let searchInput = document.querySelector('.searchBar');
// searchInput.addEventListener('input', (event) => {  // 'input' for real-time updates
//     query = event.target.value.toLowerCase(); // Convert query to lowercase for case-insensitive search
  
//     // Filter projects based on the search query
//     let filteredProjects = projects.filter((project) =>
//       project.title.toLowerCase().includes(query) // Check if title contains the query
//     );
  
//     // Re-render the filtered projects
//     renderProjects(filteredProjects, document.querySelector(".projects"), "h2");
//   });


let query = '';
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('change', (event) => {
  // update query value
  query = event.target.value;
  // filter projects
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
  // render filtered projects
  renderProjects(filteredProjects, projectsContainer, 'h2');
});

// Function to render the pie chart based on visible projects
function renderPieChart(projectsGiven) {
    // Clear previous chart elements (important to prevent duplicates)
    let newSVG = d3.select("#projects-pie-plot");
    newSVG.selectAll("*").remove(); // Remove previous paths and elements

    let newLegend = d3.select(".legend");
    newLegend.selectAll("*").remove(); // Remove previous legend items

    // Recalculate rolled data
    let newRolledData = d3.rollups(
        projectsGiven,
        (v) => v.length, // Count number of projects per year
        (d) => d.year // Group by year
    );

    // Convert rolled data into required format
    let newData = newRolledData.map(([year, count]) => ({
        value: count,
        label: year
    }));

    // If no projects match the search, return early (prevents empty charts)
    if (newData.length === 0) return;

    // Define arc and slice generators
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    // Generate slices
    let arcs = sliceGenerator(newData);

    // Define color scale
    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    // Append paths to the SVG (pie slices)
    arcs.forEach((arc, idx) => {
        newSVG.append("path")
            .attr("d", arcGenerator(arc))  // Create slice
            .attr("fill", colors(idx));  // Assign color
    });

    // Append legend items
    newData.forEach((d, idx) => {
        newLegend.append("li")
            .attr("style", `--color:${colors(idx)}`)
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
    });
}

// Function to filter projects based on search query
function filterProjects(query) {
    query = query.toLowerCase();
    return projects.filter((project) =>
        project.title.toLowerCase().includes(query)
    );
}

// Initial render of pie chart with all projects
renderPieChart(projects);

// Search event listener (updates chart & project list)
searchInput.addEventListener("input", (event) => {
    let filteredProjects = filterProjects(event.target.value);

    // Update the displayed projects
    renderProjects(filteredProjects, projectsContainer, "h2");

    // Update the pie chart
    renderPieChart(filteredProjects);
});


let selectedIndex = -1; // No wedge selected initially

// let svg = d3.select('svg');  // Select the SVG container

// 🏗️ Generate slices
let arcsData = sliceGenerator(data);


// ❌ Remove old paths before drawing new ones
svg.selectAll("path").remove();

// ✅ Draw Pie Chart Wedges
// arcsData.forEach((arcData, i) => {
//   svg
//     .append("path")
//     .attr("d", arcGenerator(arcData))
//     .attr("fill", colors(i))
//     .on("click", function () {
//       selectedIndex = selectedIndex === i ? -1 : i;  // Toggle selection

//       // ✅ Update Pie Chart Selection
//       svg
//         .selectAll("path")
//         .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));

//       // ✅ Update Legend Selection
//       legend
//         .selectAll("li")
//         .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));

//       let filteredProjects = filterProjects(query);

//       // ✅ Filter projects based on the selected year
//       if (selectedIndex === -1) {
//         renderProjects(filterProjectsilteredProjects, projectsContainer, "h2"); // Show all projects
//       } else {
//         let selectedYear = data[selectedIndex].label; // Get selected year
//         let finalFilteredProjects = filteredProjects.filter(p => p.year === selectedYear);
//         renderProjects(finalFilteredProjects, projectsContainer, "h2");
//     }
//   });
// });
// arcsData.forEach((arcData, i) => {
//     svg
//       .append("path")
//       .attr("d", arcGenerator(arcData))
//       .attr("fill", colors(i))
//       .on("click", function () {
//         selectedIndex = selectedIndex === i ? -1 : i;  // Toggle selection
  
//         // ✅ Update Pie Chart Selection
//         svg
//           .selectAll("path")
//           .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));
  
//         // ✅ Update Legend Selection
//         legend
//           .selectAll("li")
//           .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));
  
//         // ✅ Ensure we use the latest filtered projects from the search
//         let filteredProjects = filterProjects(query); // Apply search filter
  
//         // ✅ Filter projects based on the selected year
//         if (selectedIndex === -1) {
//           renderProjects(filteredProjects, projectsContainer, "h2"); // Show all search results
//         } else {
//           let selectedYear = data[selectedIndex].label; // Get selected year
//           let finalFilteredProjects = filteredProjects.filter(p => p.year === selectedYear);
//           renderProjects(finalFilteredProjects, projectsContainer, "h2");
//         }
//       });
//   });
// ✅ Handle Pie Chart Wedge Click
arcsData.forEach((arcData, i) => {
    svg
      .append("path")
      .attr("d", arcGenerator(arcData))
      .attr("fill", colors(i))
      .on("click", function () {
        updateSelection(i);  // 🔥 Call shared function
      });
});

// ✅ Make Legend Interactive
legend.selectAll("li").on("click", function (_, i) {
  updateSelection(i);  // 🔥 Call shared function
});

// ✅ Unified Selection & Filtering Function
function updateSelection(i) {
  selectedIndex = selectedIndex === i ? -1 : i;  // Toggle selection

  // ✅ Update Pie Chart Selection
  svg
    .selectAll("path")
    .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));

  // ✅ Update Legend Selection
  legend
    .selectAll("li")
    .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));

  // ✅ Ensure we use the latest filtered projects from the search
  let filteredProjects = filterProjects(query); // Apply search filter

  // ✅ Filter projects based on the selected year
  if (selectedIndex === -1) {
    renderProjects(filteredProjects, projectsContainer, "h2"); // Show all search results
  } else {
    let selectedYear = data[selectedIndex].label; // Get selected year
    let finalFilteredProjects = filteredProjects.filter(p => p.year === selectedYear);
    renderProjects(finalFilteredProjects, projectsContainer, "h2");
  }
}


// // ✅ Make Legend Interactive
// legend.selectAll("li").on("click", function (_, i) {
//   selectedIndex = selectedIndex === i ? -1 : i;  // Toggle selection

//   // ✅ Update Pie Chart Selection
//   svg
//     .selectAll("path")
//     .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));

//   // ✅ Update Legend Selection
//   legend
//     .selectAll("li")
//     .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));
// });


