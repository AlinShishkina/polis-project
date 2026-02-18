import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, addComment } from '../api';
import CommentForm from './CommentForm';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticle = () => {
    getArticle(id)
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleAddComment = async (comment) => {
    try {
      await addComment(id, comment);
      fetchArticle();
    } catch (err) {
      alert('Ошибка при добавлении комментария: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Загрузка статьи...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!article) return <div className="error">Статья не найдена</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p className="date">{new Date(article.created_at).toLocaleDateString()}</p>
      <div style={{ whiteSpace: 'pre-wrap' }}>{article.content}</div>

      <hr />
      <h2>Комментарии</h2>
      {article.comments && article.comments.length > 0 ? (
        article.comments.map(comment => (
          <div key={comment.id} className="comment">
            <strong>{comment.author_name}</strong> <small>{new Date(comment.created_at).toLocaleDateString()}</small>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>Пока нет комментариев.</p>
      )}

      <h3>Добавить комментарий</h3>
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
}