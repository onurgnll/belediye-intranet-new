import React, { useEffect, useState } from 'react';
import { GlobeAltIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import logo from '../assets/icon.jpeg';
import { getWhoAmI } from '../api/services';

export default function Header() {
  const [userInfo, setUserInfo] = useState({});
  const [dateTime, setDateTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    getWhoAmI().then((data) => setUserInfo(data));

    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Belediye Logo"
            className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 shadow"
          />
          <h1 className="text-xl font-bold tracking-wide text-gray-800 dark:text-white uppercase">
            Atakum Belediyesi Paneli
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
          <span className="text-blue-600 font-medium">
            📅 {dateTime.toLocaleDateString('tr-TR')}
          </span>
          <span className="text-pink-500 font-medium">
            ⏰ {dateTime.toLocaleTimeString('tr-TR')}
          </span>
          <span className="flex items-center gap-1">
            <GlobeAltIcon className="w-4 h-4" />
            IP: {userInfo.ip || '...'}
          </span>
          <button
            onClick={toggleTheme}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
            title="Tema değiştir"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
