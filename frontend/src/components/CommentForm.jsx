import { useState } from 'react';

export default function CommentForm({ onSubmit }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    onSubmit({ author_name: author, content });
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Ваше имя:</label>
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Комментарий:</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows="4"
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
}