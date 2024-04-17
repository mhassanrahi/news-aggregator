const apiKey = import.meta.env.VITE_GUARDIAN_API_KEY;
async function fetchArticlesFromGuardianAPI(query, filters) {
  let url = `https://content.guardianapis.com/search?api-key=${apiKey}&q=${encodeURIComponent(
    query
  )}&order-by=newest&page-size=50`;

  if (filters && Object.keys(filters).length > 0) {
    if (filters.date) {
      url += `&from-date=${encodeURIComponent(
        filters.date
      )}&to-date=${encodeURIComponent(filters.date)}`;
    }
    if (filters.category) {
      url += `&tag=${encodeURIComponent(filters.category)}/${encodeURIComponent(
        filters.category
      )}`;
    }
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.response?.results?.length) {
      return data.response.results.map((article) => ({
        title:
          article.webTitle.charAt(0).toUpperCase() + article.webTitle.slice(1),
        description:
          (filters.category || article.sectionName).charAt(0).toUpperCase() +
          (filters.category || article.sectionName).slice(1),
        url: article.webUrl,
        source: "The Guardian",
        publishedAt: article.webPublicationDate?.split("T")[0] || "",
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching articles from The Guardian API:", error);
    return [];
  }
}

export { fetchArticlesFromGuardianAPI };
