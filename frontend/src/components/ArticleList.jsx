import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../api';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Загрузка статей...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div>
      <h1>Статьи</h1>
      {articles.map(article => (
        <div key={article.id} className="article-card">
          <h2>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </h2>
          <p className="date">{new Date(article.created_at).toLocaleDateString()}</p>
          <p className="preview">{article.content.substring(0, 150)}...</p>
        </div>
      ))}
    </div>
  );
}