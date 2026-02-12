const BLOG_STORAGE_KEY = 'personalBlogPosts';

const blogForm = document.getElementById('blogForm');
const postsList = document.getElementById('postsList');

const getPosts = () => {
    const rawPosts = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!rawPosts) {
        return [
            {
                id: crypto.randomUUID(),
                title: 'Bienvenido a mi blog',
                date: new Date().toISOString().slice(0, 10),
                excerpt: 'Este es el primer artículo de ejemplo para mostrar el diseño del blog.',
                content: 'Aquí iré compartiendo aprendizajes, guías y experiencias del día a día en soporte técnico y sistemas.'
            }
        ];
    }

    try {
        const parsedPosts = JSON.parse(rawPosts);
        return Array.isArray(parsedPosts) ? parsedPosts : [];
    } catch (error) {
        console.error('No se pudieron cargar los artículos del blog', error);
        return [];
    }
};

const savePosts = (posts) => {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
};

const formatDate = (dateValue) => {
    const date = new Date(`${dateValue}T00:00:00`);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

const renderPosts = () => {
    const posts = getPosts().sort((a, b) => new Date(b.date) - new Date(a.date));

    postsList.innerHTML = '';

    if (!posts.length) {
        postsList.innerHTML = '<article class="card"><p>Todavía no hay artículos. ¡Publica el primero!</p></article>';
        return;
    }

    posts.forEach((post) => {
        const article = document.createElement('article');
        article.className = 'card blog-post';
        article.innerHTML = `
            <div class="blog-post__header">
                <h3>${post.title}</h3>
                <span>${formatDate(post.date)}</span>
            </div>
            <p class="blog-post__excerpt">${post.excerpt}</p>
            <p>${post.content}</p>
            <button class="button blog-post__delete" data-post-id="${post.id}" type="button">Eliminar</button>
        `;

        postsList.appendChild(article);
    });
};

if (blogForm && postsList) {
    blogForm.postDate.value = new Date().toISOString().slice(0, 10);

    blogForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(blogForm);
        const newPost = {
            id: crypto.randomUUID(),
            title: formData.get('title').toString().trim(),
            date: formData.get('date').toString(),
            excerpt: formData.get('excerpt').toString().trim(),
            content: formData.get('content').toString().trim()
        };

        const posts = getPosts();
        posts.push(newPost);
        savePosts(posts);

        blogForm.reset();
        blogForm.postDate.value = new Date().toISOString().slice(0, 10);
        renderPosts();
    });

    postsList.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        const postId = target.dataset.postId;

        if (!postId) {
            return;
        }

        const updatedPosts = getPosts().filter((post) => post.id !== postId);
        savePosts(updatedPosts);
        renderPosts();
    });

    const initialPosts = getPosts();
    savePosts(initialPosts);
    renderPosts();
}
