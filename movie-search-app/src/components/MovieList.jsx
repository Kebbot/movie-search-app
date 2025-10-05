// src/components/MovieList.jsx
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies, onMovieClick }) => {
    if (movies.length === 0) {
        return null; // Не показываем список, если фильмов нет
    }

    return (
        <section className="movie-list">
            <h2>Результаты поиска</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        onClick={() => onMovieClick(movie.imdbID)}
                    />
                ))}
            </div>
        </section>
    );
};

export default MovieList;