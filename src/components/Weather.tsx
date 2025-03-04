"use client";

import { useState } from "react";

interface WeatherData {
  name: string;
  sys: { country: string };
  weather: { description: string }[];
  main: { temp: number };
}

export default function Weather() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    console.log("Requête envoyée pour :", city); // 🔍 Vérifie si le bouton fonctionne
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      console.log("Réponse reçue :", response); // 🔍 Vérifie si la requête est bien envoyée

      if (!response.ok) {
        throw new Error("Ville non trouvée");
      }

      const data: WeatherData = await response.json();
      console.log("Données reçues :", data); // 🔍 Vérifie si tu reçois bien la météo
      setWeather(data);
      setError(null);
    } catch (err) {
      console.error("Erreur dans le fetch :", err);
      setError((err as Error).message);
      setWeather(null);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold">Météo</h2>
      <input
        type="text"
        placeholder="Entrez une ville"
        className="border p-2 rounded"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded ml-2" onClick={fetchWeather}>
        Rechercher
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {weather && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {weather.name}, {weather.sys.country}
          </h3>
          <p>{weather.weather[0].description}</p>
          <p>Température : {weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
}
