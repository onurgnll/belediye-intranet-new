import React from 'react';

export default function AnnouncementBox({ title, date, image, detail, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
    >
      {/* Görsel alanı */}
      <div className="w-full aspect-[16/7] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* Metin alanı */}
      <div className="p-3 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">📅 {date}</p>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 flex-grow">
          {detail || 'Açıklama bulunmamaktadır.'}
        </p>
      </div>
    </div>
  );
}
