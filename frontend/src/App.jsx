import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import AddArticleForm from './components/AddArticleForm';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/add">Добавить статью</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/add" element={<AddArticleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;