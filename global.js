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
  
    // Adjust the URL if not on the home page and it's a relative link
    if (!ARE_WE_HOME && !url.startsWith('http')) {
      url = '../' + url;
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

  // Highlight the current page
  if (window.location.pathname.endsWith(p.url)) {
    a.classList.add('current');
  }

  // Append the link to the navigation
  nav.append(a);
}

console.log("Navigation menu setup complete");