# Portfolio Website

A modern, responsive portfolio website with smooth animations and clean design.

## 📁 Project Structure

```
portfolio-site/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles and CSS variables
├── js/
│   └── script.js      # JavaScript for animations and interactions
├── images/            # Folder for your images
└── README.md          # This file
```

## 🚀 Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **Edit content**: Modify `index.html` to change text, links, and structure
3. **Customize styles**: Edit `css/style.css` to change colors, fonts, and layout
4. **Add functionality**: Modify `js/script.js` for additional JavaScript features

## ✏️ How to Customize

### Change Your Name and Info
Open `index.html` and find:
```html
<h1>YOUR<br>NAME<span class="wave">👋</span></h1>
```
Replace "YOUR NAME" with your actual name.

### Update Services
Find the services section in `index.html`:
```html
<div class="service-card scroll-reveal">
    <h3>Web Development</h3>
    <p>Your description here...</p>
</div>
```

### Change Colors
Open `css/style.css` and modify the CSS variables at the top:
```css
:root {
    --primary: #0a0a0a;      /* Main text color */
    --accent: #ff6b35;       /* Accent color (orange) */
    --accent-light: #ffb088; /* Light accent */
    --bg: #fafaf8;          /* Background color */
    /* ... more colors ... */
}
```

### Add Your Projects
In `index.html`, duplicate a project card:
```html
<div class="project-card scroll-reveal">
    <div class="project-image"></div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Project description...</p>
        <a href="#" class="project-link">View Project</a>
    </div>
</div>
```

### Add Project Images
Replace the gradient backgrounds in the `.project-image` divs with actual images:
```html
<div class="project-image" style="background-image: url('images/your-image.jpg'); background-size: cover; background-position: center;"></div>
```

### Update Social Links
Find the footer section and update the links:
```html
<a href="mailto:your@email.com">Email</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
<a href="https://github.com/yourusername">GitHub</a>
```

## 🎨 Design Features

- **Responsive Design**: Works on all devices
- **Smooth Animations**: Scroll-triggered reveals and hover effects
- **Modern Typography**: Playfair Display + DM Sans
- **Clean Layout**: Card-based design with clear sections
- **Customizable Colors**: Easy color customization with CSS variables

## 📱 Browser Support

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## 💡 Tips

1. Keep the folder structure as is for the CSS and JS to load properly
2. Add your images to the `images/` folder
3. Test on mobile by resizing your browser window
4. Customize one section at a time

## 🔧 Advanced Customization

- Add more sections by copying existing section code
- Modify animations in `css/style.css`
- Add more JavaScript interactions in `js/script.js`
- Change fonts by updating the Google Fonts link in `index.html`

## 📦 Deployment

To put your site online:
1. Upload all files to a web hosting service
2. Or use free hosting like GitHub Pages, Netlify, or Vercel
3. Make sure to keep the folder structure intact

Enjoy building your portfolio! 🎉
