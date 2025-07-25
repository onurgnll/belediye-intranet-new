"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPersonnelAttendance } from "../api/services";
import { getAuthToken, removeAuthToken } from "../utils/auth";
import {
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

export default function PersonnelAttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Default to today's date YYYY-MM-DD
  );
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_APP_API_URL;
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${API_URL}/mudur/kartbasimexcelhaftalik?token=${getAuthToken()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: selectedDate }),
        }
      );

      if (!response.ok) throw new Error("İndirme sırasında hata oluştu.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Haftalik-Yoklama.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("İndirme hatası:", err);
      alert("Rapor indirilemedi.");
    }
  };

  const downloadDailyExcel = async (date) => {
    try {
      const authToken = getAuthToken();
      const response = await fetch(
        `${API_URL}/mudur/kartbasimexcel?token=` + authToken,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date }),
        }
      );

      if (!response.ok) throw new Error("İndirme başarısız.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `gunluk-rapor-${date}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Excel indirme hatası:", error);
    }
  };

  console.log(attendanceData);
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/mudur/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchAttendance = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getPersonnelAttendance(selectedDate, token);
        console.log(response);
        if (
          response.data.success === 1 &&
          Array.isArray(response.data.data.a)
        ) {
          setAttendanceData(response.data.data.a);
        } else {
          setError(
            response.data.message || "Personel giriş/çıkış bilgileri alınamadı."
          );
          setAttendanceData([]);
        }
      } catch (err) {
        console.error("Attendance fetch error:", err);
        if (err.response && err.response.status === 401) {
          setError(
            "Oturum süresi doldu veya yetkisiz erişim. Lütfen tekrar giriş yapın."
          );
          removeAuthToken(); // Clear invalid token
          navigate("/mudur/login");
        } else {
          setError(
            "Veri alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
          );
        }
        setAttendanceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedDate, navigate]);

  const handleLogout = () => {
    removeAuthToken();
    navigate("/mudur/login");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <CalendarDaysIcon className="w-6 h-6 text-blue-600 mr-2" />
          Personel Giriş/Çıkış Takibi
        </h2>
        <button className="flex items-center px-4 py-2 bg-blue-800 hover:bg-blue-800 text-white rounded-md shadow-sm text-sm font-medium transition" onClick={() => downloadDailyExcel(selectedDate)}>
          Seçilen Günü Excel İndir
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-800 hover:bg-blue-800 text-white rounded-md shadow-sm text-sm font-medium transition" onClick={() => handleDownload(selectedDate)}>
          Seçilen Haftayı Excel İndir
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm text-sm font-medium transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          Çıkış Yap
        </button>
      </div>

      <div className="mb-6">
        <label
          htmlFor="attendanceDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Tarih Seçin:
        </label>
        <input
          type="date"
          id="attendanceDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Yükleniyor...
        </p>
      ) : error ? (
        <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
      ) : attendanceData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Ad Soyad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Giriş
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Çıkış
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Durum
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Zamanlama
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {attendanceData.map((person, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {person.ad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {person.giris || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {person.cikis || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        person.durum === "Geldi"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                      }`}
                    >
                      {person.durum}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-1">
                    {person?.zaman?.length === 0 ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
                        Uygun
                      </span>
                    ) : (
                      person?.zaman?.map((durum, index) => (
                        <span
                          key={index}
                          className={
                            durum == "Uygun"
                              ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                              : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200"
                          }
                        >
                          {durum}
                        </span>
                      ))
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Seçilen tarihte personel bilgisi bulunamadı.
        </p>
      )}
    </div>
  );
}
