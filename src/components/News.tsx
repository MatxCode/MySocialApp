"use client";

import { useState, useEffect } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true); 
        const response = await fetch("/api/news");
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setArticles(data.articles);
        }
      } catch (err) {
        setError("Impossible de récupérer les actualités.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📰 Actualités</h2>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-gray-300"></div>
          <p className="ml-2">Chargement des actualités...</p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover mb-2 rounded" />
            )}
            <h3 className="font-bold text-lg">{article.title}</h3>
            <p className="text-sm">{article.description}</p>
            <a href={article.url} target="_blank" className="text-blue-500 hover:underline mt-2 inline-block">
              Lire l'article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
