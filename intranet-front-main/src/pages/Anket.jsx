import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnketler } from "../api/services";
import AnketCard from "../components/AnketCard";

export default function Anket() {
  const [anketler, setAnketler] = useState([]);

  useEffect(() => {
    getAnketler()
      .then((res) => {
        const surveyList = res?.data?.data?.surveys;
        if (Array.isArray(surveyList)) {
          const formatted = surveyList.map((a) => ({
            id: a.id,
            title: a.title || "Başlık yok",
            description: a.description || "Açıklama yok.",
            image: a.image
              ? `${import.meta.env.VITE_APP_URL}/anket/${a.image}`
              : null,
            importance: a.importance || "normal",
            startDate: a.startDate || null,
            endDate: a.endDate || null,
          }));
          setAnketler(formatted);
        }
      })
      .catch((err) => {
        console.error("Anketler alınamadı:", err);
      });
  }, []);

  const answered = JSON.parse(localStorage.getItem("answeredAnket")) || [];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6 space-y-6">
      <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400">
        📋 Anket Listesi
      </h2>

      {anketler.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {anketler.map((anket) => {
            if (answered.includes(anket.id)) {
              return (<AnketCard survey={anket} />)
            } else {
              return (
                <Link to={`/anketPage/${anket.id}`} key={anket.id}>
                  <AnketCard survey={anket} />
                </Link>
              );
            }
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Henüz anket bulunmamaktadır.
        </p>
      )}
    </div>
  );
}
