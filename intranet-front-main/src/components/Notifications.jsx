import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { getAnketler } from "../api/services";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAnketler()
      .then((res) => {
        const surveys = res?.data?.data?.surveys || [];
        const answered =
          JSON.parse(localStorage.getItem("answeredAnket")) || [];

        const mapped = surveys.map((a) => ({
          id: a.id,
          title: `${a.title} Yayında`,
          link: answered.includes(a.id) ? `/anketPage/${a.id}` : "",
          isRead: answered.includes(a.id),
        }));

        setNotifications(mapped);
      })
      .catch((err) => console.error("Anketler alınamadı:", err));
  }, []);

  const handleClick = (id, link) => {
    const answered = JSON.parse(localStorage.getItem("answeredAnket")) || [];

    if (!answered.includes(a.id));
    navigate(link);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 w-full border border-gray-300 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <BellIcon className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Yeni Anket Bildirimleri
        </h3>
      </div>
      <ul className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <li
              key={n.id}
              onClick={() => handleClick(n.id, n.link)}
              className={`flex justify-between items-center p-3 rounded-md border transition cursor-pointer
                ${
                  n.isRead
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-500"
                    : "bg-blue-50 dark:bg-gray-700 text-gray-800 dark:text-white border-blue-300"
                }`}
            >
              <p className="text-sm font-medium">{n.title}</p>
              {n.isRead ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <ExclamationCircleIcon className="w-5 h-5 text-orange-500 animate-pulse" />
              )}
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Yeni anket bulunamadı.
          </p>
        )}
      </ul>
    </div>
  );
}
