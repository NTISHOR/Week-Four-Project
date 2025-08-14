const app = document.getElementById('app');

// Simulated blog data with the new post about Akpotu Augustine


const blogPosts = [

    
   { 
        id: 6, 
        title: 'About Akpotu Augustine, a Computer Science Student', 
        excerpt: 'A brief look at Akpotu Augustine\'s journey in Computer Science.',
        content: `
            <h2>About Akpotu Augustine</h2>
            <p>Akpotu Augustine is a dedicated student pursuing a degree in Computer Science. In this field of study, Augustine is exploring the vast realms of technology, coding, and problem-solving to prepare for a future in the tech industry.</p>
            <h2>Interests and Studies</h2>
            <p>As a Computer Science student, Akpotu Augustine is likely delving into topics like:</p>
            <ul>
                <li><strong>Programming languages</strong>: Learning languages such as Python, Java, or C++ to build software and applications.</li>
                <li><strong>Algorithms and data structures</strong>: Understanding efficient ways to solve problems and manage data.</li>
                <li><strong>Software development</strong>: Gaining skills to design, develop, and test software.</li>
            </ul>
            <h2>Goals and Aspirations</h2>
            <p>Students like Akpotu Augustine often aspire to:</p>
            <ul>
                <li><strong>Contribute to tech innovations</strong>: Making an impact through technology in areas like app development, AI, cybersecurity, or data science.</li>
                <li><strong>Build a career in tech</strong>: Pursuing roles like software engineer, data analyst, or tech consultant.</li>
            </ul>
            <h2>Conclusion</h2>
            <p>Akpotu Augustine's journey in Computer Science is a path filled with learning, coding, and preparing for a tech-driven future. The field offers vast opportunities for growth and innovation.</p>
        `
    },
];

function renderBlogList() {
    app.innerHTML = '<h1>Blog</h1>';
    blogPosts.forEach(post => {
        app.innerHTML += `
            <div class="blog-post">
                <h2><a href="#post/${post.id}">${post.title}</a></h2>
                <p>${post.excerpt}</p>
                <a href="#post/${post.id}">Read More</a>
            </div>
        `;
    });
}

function renderBlogPost(id) {
    const post = blogPosts.find(p => p.id === Number(id));
    if (!post) {
        app.innerHTML = '<p>Post not found.</p>';
        return;
    }
    app.innerHTML = `
        <a href="#" class="back-link">Back to Blog</a>
        <h1>${post.title}</h1>
        ${post.content}
    `;
}

function handleRoute() {
    const hash = location.hash.slice(1);
    if (!hash || hash === '') {
        renderBlogList();
    } else if (hash.startsWith('post/')) {
        const id = hash.split('/')[1];
        renderBlogPost(id);
    }
}

window.addEventListener('hashchange', handleRoute);
handleRoute();
