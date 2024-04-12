import { fetchArticlesFromGuardianAPI } from "./guardianAPIService";
import { fetchArticlesFromNYTAPI } from "./nytAPIService";
import { fetchArticlesFromNewsAPI } from "./newsAPIService";

async function searchArticles(query, filters) {
  try {
    if (!query) {
      return [];
    }

    const [guardianArticles, nytArticles, newsArticles] = await Promise.all([
      fetchArticlesFromGuardianAPI(query, filters),
      fetchArticlesFromNYTAPI(query, filters),
      fetchArticlesFromNewsAPI(query, filters),
    ]);
    const allArticles = [...guardianArticles, ...nytArticles, ...newsArticles];

    allArticles.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    // Filter out articles with title "[Removed]"
    const filteredArticles = allArticles.filter(
      (article) => article.title !== "[Removed]"
    );

    return filteredArticles;
  } catch (error) {
    console.error("Error searching articles:", error);
    return [];
  }
}

export { searchArticles };
