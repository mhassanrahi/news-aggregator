function ArticleList({ articles }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Articles</h2>
      {articles && articles.length > 0 ? (
        <div className="grid gap-4">
          {articles.map((article, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">{article.title}</h3>
              <p className="text-gray-600">{article.description}</p>
              <p className="text-sm text-gray-500 mt-2">Source: {article.source}</p>
              <a href={article.url} className="text-blue-500 mt-2 block" target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}

export default ArticleList;
