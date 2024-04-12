import { useState, useEffect } from "react";
import "./App.css";
import ArticleList from "./components/ArticleList";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import { fetchArticlesFromNewsAPI } from "./services/newsAPIService";
import { fetchArticlesFromGuardianAPI } from "./services/guardianAPIService";
import { fetchArticlesFromNYTAPI } from "./services/nytAPIService";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchDefaultArticles = async () => {
      const defaultArticles = await fetchArticlesFromNewsAPI("", {});

      setArticles(defaultArticles);
    };

    fetchDefaultArticles();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = async (filterOptions) => {
    setFilters(filterOptions);

    let fetchedArticles = [];

    if (
      filterOptions.selectedDataSource === "newsapi" ||
      !filterOptions.selectedDataSource
    ) {
      fetchedArticles = await fetchArticlesFromNewsAPI(
        searchQuery,
        filterOptions
      );
    } else if (filterOptions.selectedDataSource === "guardian") {
      fetchedArticles = await fetchArticlesFromGuardianAPI(
        searchQuery,
        filterOptions
      );
    } else if (filterOptions.selectedDataSource === "nytimes") {
      fetchedArticles = await fetchArticlesFromNYTAPI(
        searchQuery,
        filterOptions
      );
    }

    setArticles(fetchedArticles);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">News Aggregator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <SearchBar onSearch={handleSearch} />
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
