// src/App.jsx
import { useState } from 'react';
import axios from 'axios';
import './App.css'; // ← этот импорт очень важен!
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import './components/Header.css';
import './components/SearchBar.css';
import './components/MovieList.css';
import './components/MovieCard.css';
import './components/MovieModal.css';
//import './debug.css';

// Ваш API ключ (можно заменить на свой)
const API_KEY = 'a2b07930';
const BASE_URL = 'https://www.omdbapi.com/';

function App() {
  // Состояния приложения
  const [movies, setMovies] = useState([]); // Список найденных фильмов
  const [selectedMovie, setSelectedMovie] = useState(null); // Фильм для показа в модалке
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [error, setError] = useState(''); // Сообщение об ошибке
  const [searchTerm, setSearchTerm] = useState(''); // Текущий поисковый запрос

  // Функция для поиска фильмов
  const searchMovies = async (title) => {
    if (!title.trim()) {
      setMovies([]);
      setError('Пожалуйста, введите название фильма');
      return;
    }

    setIsLoading(true);
    setError('');
    setSelectedMovie(null); // Закрываем модалку при новом поиске

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: title,
        },
      });

      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error || 'Фильмы не найдены');
      }
    } catch (err) {
      setError('Произошла ошибка при получении данных');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для получения детальной информации о фильме по его ID
  const fetchMovieDetails = async (imdbID) => {
    setIsLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          i: imdbID,
          plot: 'full', // Получаем полное описание
        },
      });

      if (response.data.Response === 'True') {
        setSelectedMovie(response.data);
      }
    } catch (err) {
      setError('Не удалось загрузить детали фильма');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => searchMovies(searchTerm)}
        />

        {isLoading && <div className="loading">Загрузка...</div>}
        {error && <div className="error">{error}</div>}

        <MovieList
          movies={movies}
          onMovieClick={fetchMovieDetails}
        />

        {/* Модальное окно показывается, если selectedMovie не null */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            isOpen={!!selectedMovie}
            onClose={closeModal}
          />
        )}
      </main>
    </div>
  );
}

export default App;