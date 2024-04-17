import { useState } from "react";
import { formatDate } from "../utils";

function ArticleList({ articles }) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const [expandedArticles, setExpandedArticles] = useState([]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const toggleExpand = (index) => {
    setExpandedArticles((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
      {currentArticles.map((article, index) => (
        <div key={index} className="mb-4 border border-gray-300 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-700 mb-2">
            {" "}
            {article.description && expandedArticles.includes(index)
              ? article.description
              : article.description && article.description.length > 300
              ? article.description.slice(0, 300) + "..."
              : article.description}
            {article.description && article.description.length > 300 && (
              <button
                className="text-blue-500 hover:underline"
                onClick={() => toggleExpand(index)}
              >
                {expandedArticles.includes(index) ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
          <p className="text-sm text-gray-500">
            Published on: {formatDate(article.publishedAt)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Source: {article.source}</p>
          <a
            href={article.url}
            className="text-blue-500 mt-2 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full article
          </a>
        </div>
      ))}
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(articles.length / articlesPerPage)).keys()].map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber + 1)}
              className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded ${
                pageNumber + 1 === currentPage ? "bg-blue-600" : ""
              }`}
            >
              {pageNumber + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default ArticleList;
