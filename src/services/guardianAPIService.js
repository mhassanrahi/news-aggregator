const apiKey = import.meta.env.VITE_GUARDIAN_API_KEY;
async function fetchArticlesFromGuardianAPI(query, filters) {
  let url = `https://content.guardianapis.com/search?api-key=${apiKey}&q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.response?.results?.length) {
      return data.response.results.map((article) => ({
        title: article.webTitle,
        description: article.sectionName,
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
