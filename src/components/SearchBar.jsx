import { useState } from "react";

function SearchBar({ onSearch, onClearSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onClearSearch();
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search articles..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
        >
          Clear
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
