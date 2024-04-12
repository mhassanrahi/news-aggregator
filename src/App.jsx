import { useState, useEffect } from "react";
import "./App.css";
import ArticleList from "./components/ArticleList";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import { fetchArticlesFromNewsAPI } from "./services/newsAPIService";
import { fetchArticlesFromGuardianAPI } from "./services/guardianAPIService";
import { fetchArticlesFromNYTAPI } from "./services/nytAPIService";
import { searchArticles } from "./services/searchService";
import { DATA_SOURCE } from "./constant";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let fetchedArticles = [];
      if (searchQuery) {
        fetchedArticles = await searchArticles(searchQuery, filters);
      } else if (filters.selectedDataSource === DATA_SOURCE.GUARDIAN) {
        fetchedArticles = await fetchArticlesFromGuardianAPI("latest", {});
      } else if (filters.selectedDataSource === DATA_SOURCE.NYTIMES) {
        fetchedArticles = await fetchArticlesFromNYTAPI("latest", {});
      } else {
        fetchedArticles = await fetchArticlesFromNewsAPI("latest", {});
      }
      setArticles(fetchedArticles);
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">News Aggregator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <SearchBar onSearch={handleSearch} onClearSearch={onClearSearch} />
          <ArticleList articles={articles} />
        </div>
        <div>
          <Filters onFilter={handleFilter} onReset={handleResetFilters} />
        </div>
      </div>
    </div>
  );
}

export default App;
