console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

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
function setupNavigation() {
    // Define the navigation menu HTML
    // const navHTML = `
    //   <nav>
    //     <ul>
    //       <li><a href="../index.html">Home</a></li>
    //       <li><a href="../projects/index.html">Projects</a></li>
    //       <li><a href="../contact/index.html">Contact</a></li>
    //       <li><a href="https://github.com/zeyuedwardqi" target="_blank">GitHub Profile</a></li>
    //       <li><a href="../cv/index.html">CV</a></li>
    //     </ul>
    //   </nav>
    // `;
    const navHTML = `
  <nav>
    <ul>
      <li><a href="/index.html">Home</a></li>
      <li><a href="/projects/index.html">Projects</a></li>
      <li><a href="/contact/index.html">Contact</a></li>
      <li><a href="https://github.com/zeyuedwardqi" target="_blank">GitHub Profile</a></li>
      <li><a href="/cv/index.html">CV</a></li>
    </ul>
  </nav>
`;
  
    // Insert the navigation menu into the body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  
    // Get all nav links
    const navLinks = $$("nav a");
  
    // Find the link to the current page
    const currentLink = navLinks.find(
      (link) => new URL(link.href, window.location.origin).pathname === window.location.pathname
    );
  
    // Add the 'current' class to the found link
    if (currentLink) {
      currentLink.classList.add("current");
    }
  }
  
  // Call the function to set up navigation
  setupNavigation();