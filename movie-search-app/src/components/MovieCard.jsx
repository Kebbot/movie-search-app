// src/components/MovieCard.jsx
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
    // Заглушка для случая, когда постер отсутствует
    const posterSrc =
        movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'; // Создайте этот файл или используйте ссылку

    return (
        <article className="movie-card" onClick={onClick}>
            <div className="movie-poster">
                <img src={posterSrc} alt={`Постер фильма ${movie.Title}`} />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">{movie.Year}</p>
                <p className="movie-type">{movie.Type === 'movie' ? 'Фильм' : 'Сериал'}</p>
            </div>
        </article>
    );
};

export default MovieCard;