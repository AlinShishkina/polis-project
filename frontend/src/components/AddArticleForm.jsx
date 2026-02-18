import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../api';

export default function AddArticleForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      const article = await createArticle({ title, content });
      navigate(`/article/${article.id}`);
    } catch (err) {
      alert('Ошибка при создании статьи: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить новую статью</h2>
      <div className="form-group">
        <label>Заголовок:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Содержание:</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows="10"
        />
      </div>
      <button type="submit">Создать статью</button>
    </form>
  );
}