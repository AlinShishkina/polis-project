const API_BASE = '/api'; // так как фронтенд и API будут на одном домене через Nginx

export async function getArticles() {
    const res = await fetch(`${API_BASE}/articles`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
}

export async function getArticle(id) {
    const res = await fetch(`${API_BASE}/articles/${id}`);
    if (!res.ok) throw new Error('Failed to fetch article');
    return res.json();
}

export async function createArticle(article) {
    const res = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
    });
    if (!res.ok) throw new Error('Failed to create article');
    return res.json();
}

export async function addComment(articleId, comment) {
    const res = await fetch(`${API_BASE}/articles/${articleId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
    });
    if (!res.ok) throw new Error('Failed to add comment');
    return res.json();
}