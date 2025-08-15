const app = document.getElementById("app");
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
});

// Load blogs from localStorage or default
let blogs = JSON.parse(localStorage.getItem("blogs")) || [
    { 
        id: 1, 
        title: "Meet Akpotu Augustine Ntishor – A Rising Computer Scientist", 
        content: `
        <div class="blog-content">
        <p>Akpotu Augustine Ntishor is a passionate Computer Science student at the University of Calabar, Nigeria. 
        Known for his dedication to technology, Augustine has developed a deep interest in software development, 
        web technologies, and problem-solving through programming.</p>

        <p>His academic journey is driven by curiosity — from learning the fundamentals of coding to exploring 
        advanced topics like React.js, database management, and algorithm design. He believes in learning by building, 
        and he has worked on several personal projects that showcase his skills.</p>

        <p>Augustine’s vision is to contribute to Nigeria’s tech ecosystem by creating innovative solutions that address 
        real-life challenges. When he’s not coding, you’ll find him exploring tech blogs, learning new frameworks, 
        or mentoring fellow students who are just starting their programming journey.</p>

        <p>As he continues to grow his portfolio, Akpotu Augustine Ntishor stands as a shining example of how passion 
        and persistence can shape a successful career in technology.</p>
        </div>
        `
    },
    { id: 2, title: "Second Blog", content: "<div class='blog-content'><p>This is the second blog post.</p></div>" },
    { id: 3, title: "JavaScript Tips", content: "<div class='blog-content'><p>Some useful tips for JavaScript developers.</p></div>" }
];

// Save blogs to localStorage
function saveBlogs() {
    localStorage.setItem("blogs", JSON.stringify(blogs));
}

// Simulated fetch
function fetchBlogs() {
    return new Promise(resolve => {
        setTimeout(() => resolve(blogs), 300);
    });
}

// Render functions
function renderHome() {
    app.innerHTML = `
        <div class="blog-content">
            <h1>Welcome to My Blog</h1>
            <p>Read interesting articles and share your thoughts!</p>
        </div>
    `;
}

function renderBlogs() {
    fetchBlogs().then(data => {
        app.innerHTML = `
            <h2>All Blogs</h2>
            <ul class="blog-list">
                ${data.map(b => `<li><a href="#blog-${b.id}">${b.title}</a></li>`).join("")}
            </ul>
            <h3>Add a New Blog</h3>
            <form id="blogForm">
                <input type="text" id="title" placeholder="Blog Title" required>
                <textarea id="content" placeholder="Blog Content" required></textarea>
                <button type="submit">Add Blog</button>
            </form>
        `;

        document.getElementById("blogForm").addEventListener("submit", e => {
            e.preventDefault();
            const title = document.getElementById("title").value.trim();
            const content = document.getElementById("content").value.trim();
            if (!title || !content) return;

            blogs.push({ id: blogs.length + 1, title, content: `<div class='blog-content'><p>${content}</p></div>` });
            saveBlogs();
            location.hash = "#blogs"; 
        });
    });
}

function renderBlogDetails(id) {
    const blog = blogs.find(b => b.id === parseInt(id));
    if (!blog) {
        app.innerHTML = "<p>Blog not found!</p>";
        return;
    }
    app.innerHTML = `
        <h2>${blog.title}</h2>
        ${blog.content}
        <br>
        <button onclick="location.hash='#blogs'">Back to Blogs</button>
    `;
}

function renderAbout() {
    app.innerHTML = `
        <div class="blog-content">
            <h2>About This Blog</h2>
            <p>This is a demo blog built using HTML, CSS, and JavaScript without any frameworks. It supports adding and saving blogs using localStorage.</p>
        </div>
    `;
}

// Router
function router() {
    const hash = location.hash || "#home";
    if (hash === "#home") renderHome();
    else if (hash === "#blogs") renderBlogs();
    else if (hash.startsWith("#blog-")) renderBlogDetails(hash.split("-")[1]);
    else if (hash === "#about") renderAbout();
    else renderHome();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
