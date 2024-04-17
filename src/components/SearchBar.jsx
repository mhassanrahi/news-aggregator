import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Search news..."
          className="px-4 py-2 w-full focus:outline-none"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded mx-2"
          >
            <FaTimes />
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600
            rounded mx-2
            "
          >
            <FaSearch />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
