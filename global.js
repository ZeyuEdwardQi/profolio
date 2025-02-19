console.log('IT’S ALIVE!');


const BASE_PATH = "/profolio/";

const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Define the pages for the navigation menu
const pages = [
    { url: 'index.html', title: 'Home' },
    { url: './projects/index.html', title: 'Projects' },
    { url: './contact/index.html', title: 'Contact' },
    { url: './cv/index.html', title: 'CV' },
    { url: './meta/index.html', title: 'Meta' },
    { url: 'https://github.com/zeyuedwardqi', title: 'GitHub Profile' }
  ];


// const pages = [
//   { url: '../index.html', title: 'Home' },
//   { url: '../projects/index.html', title: 'Projects' },  // Keep it relative
//   { url: '../contact/index.html', title: 'Contact' },
//   { url: '../cv/index.html', title: 'CV' },
//   { url: '../meta/index.html', title: 'Meta' },
//   { url: 'https://github.com/zeyuedwardqi', title: 'GitHub Profile' }
// ];


let nav = document.createElement('nav');
document.body.prepend(nav);


for (let p of pages) {
    let url = p.url;

    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  
    let a = document.createElement('a');
    a.href = url;
    a.textContent = p.title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
      a.classList.add('current');
    }
  }
  


console.log("Navigation menu setup complete");

console.log("✅ global.js is loaded!");


// Add the theme switcher dropdown dynamically
document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <label class="color-scheme">
      Theme:
      <select id="color-scheme-selector">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  `
);

const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

// Function to update the theme
function updateTheme(theme) {
    const root = document.documentElement;

    // Apply the selected theme
    if (theme === "light") {
        root.style.colorScheme = "light";
    } else if (theme === "dark") {
        root.style.colorScheme = "dark";
    } else {
        root.style.colorScheme = prefersDarkMode.matches ? "dark" : "light";
    }

    // Save the theme preference to localStorage
    localStorage.setItem("colorScheme", theme);
}

// On page load, retrieve the saved theme or default to "light dark" (Automatic)
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("colorScheme") || "light dark";
    document.getElementById("color-scheme-selector").value = savedTheme;
    updateTheme(savedTheme);
});

// Listen for changes in the dropdown and update the theme
document.getElementById("color-scheme-selector").addEventListener("input", (e) => {
    updateTheme(e.target.value);
});

export async function fetchJSON(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      let data = await response.json();

      // Convert an object to an array if necessary
      if (!Array.isArray(data)) {
          console.warn("⚠️ projects.json is an object. Converting to an array...");
          data = Object.values(data);
      }

      return data;
  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}


export function renderProjects(projects, containerElement, headingLevel = "h2") {
  // Ensure the container element exists
  if (!containerElement || !(containerElement instanceof HTMLElement)) {
      console.error("Invalid container element provided");
      return;
  }

  // Validate heading level (must be h1-h6)
  const validHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"];
  if (!validHeadings.includes(headingLevel)) {
      console.warn(`Invalid heading level: "${headingLevel}". Defaulting to "h2".`);
      headingLevel = "h2";
  }

  // Clear previous content to avoid duplication
  containerElement.innerHTML = '';

  // Loop through each project and create an article for it
  projects.forEach(project => {
      const article = document.createElement("article");

      // Ensure data integrity and provide fallbacks for missing values
      const title = project.title || "Untitled Project";
      const imageSrc = project.image || "default-image.png"; // Placeholder image
      const imageAlt = project.title || "Project image"; // Use title as alt text
      const description = project.description || "No description available.";
      const year = project.year ? ` <em>c. ${project.year}</em>` : ""; // Display year if available


      // Create the heading dynamically
      const heading = document.createElement(headingLevel);
      heading.textContent = title;

      // Populate the article
      article.appendChild(heading);
      article.innerHTML += `
          <img src="${imageSrc}" alt="${imageAlt}">
          <h4 class="project-year">${year}</h4>
          <p>${description}</p>
          
      `;

      // Append article to the container safely
      containerElement.appendChild(article);
  });
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
