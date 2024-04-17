import { useState, useEffect } from "react";
import "./App.css";
import ArticleList from "./components/ArticleList";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import {
  fetchArticlesFromNewsAPI,
  fetchArticlesFromGuardianAPI,
  fetchArticlesFromNYTAPI,
  searchArticles,
} from "./services";
import { DATA_SOURCE } from "./constant";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedArticles = [];
        if (searchQuery) {
          fetchedArticles = await searchArticles(searchQuery, filters);
        } else if (filters.selectedDataSource === DATA_SOURCE.NYTIMES) {
          fetchedArticles = await fetchArticlesFromNewsAPI("latest", {});
        } else if (filters.selectedDataSource === DATA_SOURCE.GUARDIAN) {
          fetchedArticles = await fetchArticlesFromNYTAPI("latest", {});
        } else {
          fetchedArticles = await fetchArticlesFromGuardianAPI("latest", {});
        }
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (filterOptions) => {
    setFilters(filterOptions);
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="container">
      <div className="mb-4 md:flex md:justify-between border-b-2 border-gray-300">
        <h1 className="text-3xl font-semibold mb-4">
          <a href="#" className="text-black hover:text-blue-500">
            News Aggregator
          </a>
        </h1>
        <SearchBar onSearch={handleSearch} onClearSearch={onClearSearch} />
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        <>
          <div className="md:flex-1 order-1">
            {loading ? (
              <p className="text-xl">Loading...</p>
            ) : (
              <ArticleList articles={articles} />
            )}
          </div>
          <div className="md:w-1/4 md:order-last mb-4 border-2 p-2 rounded md:mb-0 md:border-none md:p-0">
            <Filters onFilter={handleFilter} onReset={handleResetFilters} />
          </div>
        </>
      </div>
    </div>
  );
}

export default App;
