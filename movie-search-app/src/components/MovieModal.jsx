// src/components/MovieModal.jsx
import { FaTimes, FaStar, FaImdb } from 'react-icons/fa';
import './MovieModal.css';

const MovieModal = ({ movie, isOpen, onClose }) => {
    if (!isOpen) return null;

    // Функция для закрытия модалки по клику на фон
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Заглушка для постера
    const posterSrc =
        movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png';

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="modal-body">
                    <div className="modal-poster">
                        <img src={posterSrc} alt={`Постер фильма ${movie.Title}`} />
                    </div>

                    <div className="modal-details">
                        <h2>{movie.Title} ({movie.Year})</h2>

                        <div className="movie-meta">
                            <span className="rating">
                                <FaStar className="icon" /> IMDB: {movie.imdbRating}
                            </span>
                            <span className="runtime">{movie.Runtime}</span>
                            <span className="rated">{movie.Rated}</span>
                        </div>

                        <div className="movie-plot">
                            <h3>Сюжет</h3>
                            <p>{movie.Plot}</p>
                        </div>

                        <div className="movie-info-grid">
                            <div className="info-item">
                                <strong>Жанр:</strong> {movie.Genre}
                            </div>
                            <div className="info-item">
                                <strong>Режиссер:</strong> {movie.Director}
                            </div>
                            <div className="info-item">
                                <strong>Актеры:</strong> {movie.Actors}
                            </div>
                            <div className="info-item">
                                <strong>Язык:</strong> {movie.Language}
                            </div>
                            <div className="info-item">
                                <strong>Страна:</strong> {movie.Country}
                            </div>
                            <div className="info-item">
                                <strong>Награды:</strong> {movie.Awards}
                            </div>
                        </div>

                        {movie.imdbID && (
                            <a
                                href={`https://www.imdb.com/title/${movie.imdbID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="imdb-link"
                            >
                                <FaImdb /> Открыть на IMDB
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;