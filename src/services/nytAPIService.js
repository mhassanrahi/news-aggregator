const apiKey = import.meta.env.VITE_NYT_API_KEY;

async function fetchArticlesFromNYTAPI(query, filters) {
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.response?.docs?.length) {
      return data.response.docs.map((article) => ({
        id: article._id,
        title: article.headline.main,
        date: article.pub_date,
        url: article.web_url,
        section: article.section_name,
        description: article.lead_paragraph,
        source: article.source,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching articles from New York Times API:", error);
    return [];
  }
}

export { fetchArticlesFromNYTAPI };
