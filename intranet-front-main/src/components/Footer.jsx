import React from 'react';
import ataturkImg from '../assets/ataturk.png'; 

export default function Footer() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <img
          src={ataturkImg}
          alt="Mustafa Kemal Atatürk"
          className="w-12 h-12 object-contain"
        />
        <p className="text-sm text-gray-700 dark:text-gray-300 italic font-medium max-w-[200px]">
          “Yurdunu en çok seven görevini en iyi şekilde yapandır.”
        </p>
      </div>
    </div>
  );
}
