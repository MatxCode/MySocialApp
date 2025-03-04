import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return new Response(JSON.stringify({ error: "Ville invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "Clé API manquante" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Ville non trouvée" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
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