import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Введите название фильма..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <FaSearch />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;