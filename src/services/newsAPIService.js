const apiKey = import.meta.env.VITE_NEWS_API_KEY;

async function fetchArticlesFromNewsAPI(query, filters) {
  let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&q=${
    query || "latest"
  }`;

  if (filters.category) {
    url += `&category=${filters.category}`;
  }

  if (filters.source) {
    url += `&sources=${filters.source}`;
  }

  if (filters.country) {
    url += `&country=${filters.country}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles
      .filter((article) => article.title !== "[Removed]")
      .map((article) => ({
        id: article.source.id,
        title: article.title,
        date: article.publishedAt,
        url: article.url,
        section: null,
        description: article.description,
        source: article.source.name,
      }));
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return [];
  }
}

export { fetchArticlesFromNewsAPI };
