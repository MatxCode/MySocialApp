import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const API_KEY = process.env.NEWSAPI_KEY;
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "Clé API NewsAPI manquante" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Utilisation de `everything` avec un mot-clé
  const API_URL = `https://newsapi.org/v2/everything?q=France&language=fr&apiKey=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Problème avec NewsAPI" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    
    if (!data.articles || data.articles.length === 0) {
      return new Response(JSON.stringify({ error: "Aucune actualité trouvée" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
