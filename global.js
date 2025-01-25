console.log('IT’S ALIVE!');

// function $$(selector, context = document) {
//   return Array.from(context.querySelectorAll(selector));
// }

// // Get all nav links
// const navLinks = $$("nav a");

// // Find the link to the current page
// const currentLink = navLinks.find(
//   (link) => new URL(link.href, window.location.origin).pathname === window.location.pathname
// );

// // Add the 'current' class to the found link
// if (currentLink) {
//   currentLink?.classList.add("current");
// }

// Function to add the navigation menu and highlight the current link
// function setupNavigation() {
//     // Define the navigation menu HTML
//     // const navHTML = `
//     //   <nav>
//     //     <ul>
//     //       <li><a href="../index.html">Home</a></li>
//     //       <li><a href="../projects/index.html">Projects</a></li>
//     //       <li><a href="../contact/index.html">Contact</a></li>
//     //       <li><a href="https://github.com/zeyuedwardqi" target="_blank">GitHub Profile</a></li>
//     //       <li><a href="../cv/index.html">CV</a></li>
//     //     </ul>
//     //   </nav>
//     // `;
//     const navHTML = `
//   <nav>
//     <ul>
//       <li><a href="/index.html">Home</a></li>
//       <li><a href="/projects/index.html">Projects</a></li>
//       <li><a href="/contact/index.html">Contact</a></li>
//       <li><a href="https://github.com/zeyuedwardqi" target="_blank">GitHub Profile</a></li>
//       <li><a href="/cv/index.html">CV</a></li>
//     </ul>
//   </nav>
// `;
  
//     // Insert the navigation menu into the body
//     document.body.insertAdjacentHTML('afterbegin', navHTML);
  
//     // Get all nav links
//     const navLinks = $$("nav a");
  
//     // Find the link to the current page
//     const currentLink = navLinks.find(
//       (link) => new URL(link.href, window.location.origin).pathname === window.location.pathname
//     );
  
//     // Add the 'current' class to the found link
//     if (currentLink) {
//       currentLink.classList.add("current");
//     }
//   }
  
//   // Call the function to set up navigation
//   setupNavigation();

const BASE_PATH = "/profolio/";

const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Define the pages for the navigation menu
const pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'cv/', title: 'CV' },
    { url: 'https://github.com/zeyuedwardqi', title: 'GitHub Profile' }
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);


for (let p of pages) {
    let url = p.url;
  
    // Prepend BASE_PATH to relative URLs
    if (!url.startsWith('http')) {
      url = BASE_PATH + url;
    }
  
    // Create the <a> element
    let a = document.createElement('a');
    a.href = url;
    a.textContent = p.title;
  
    // If it's an external link, open in a new tab
    if (url.startsWith('http')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
    // a.toggleAttribute('target', a.host !== location.host);
    // a.toggleAttribute('rel', a.host !== location.host && a.target === '_blank');
  
    // Highlight the current page
    // const fullPath = window.location.pathname;
    // const expectedPath = BASE_PATH + p.url;
    // if (fullPath === expectedPath || (ARE_WE_HOME && fullPath === BASE_PATH)) {
    //     a.classList.add('current');
    // }

    // a.classList.toggle(
    //     'current',
    //     a.host === location.host && a.pathname === location.pathname
    // );

    const fullPath = window.location.pathname.endsWith("/")
        ? window.location.pathname
        : window.location.pathname + "/";
    const expectedPath = (BASE_PATH + p.url).endsWith("/")
        ? BASE_PATH + p.url
        : BASE_PATH + p.url + "/";

    a.classList.toggle("current", a.host === location.host && fullPath === expectedPath);
  
    // Append the link to the navigation
    nav.append(a);
  }
  


console.log("Navigation menu setup complete");


// // Add the theme switcher dropdown dynamically
// document.body.insertAdjacentHTML(
//     "afterbegin",
//     `
//     <label class="color-scheme">
//       Theme:
//       <select id="color-scheme-selector">
//         <option value="auto">Automatic</option>
//         <option value="light">Light</option>
//         <option value="dark">Dark</option>
//       </select>
//     </label>
//   `
//   );
  
// const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

// function updateTheme(theme) {
// const root = document.documentElement;

// if (theme === "light") {
//     root.style.colorScheme = "light";
// } else if (theme === "dark") {
//     root.style.colorScheme = "dark";
// } else {
//     root.style.colorScheme = prefersDarkMode.matches ? "dark" : "light";
// }

// localStorage.setItem("theme", theme);
// }

// document.getElementById("color-scheme-selector").addEventListener("change", (e) => {
// updateTheme(e.target.value);
// });

// window.addEventListener("DOMContentLoaded", () => {
// const savedTheme = localStorage.getItem("theme") || "auto";
// const themeSelector = document.getElementById("color-scheme-selector");
// themeSelector.value = savedTheme;
// updateTheme(savedTheme);
// });

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
