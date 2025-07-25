import React from 'react';
import useEscapeKey from '../utils/useEscapeKey';
const AnnouncementModal = ({ visible, onClose, data }) => {
 useEscapeKey(onClose);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      //onClick={onClose} 
    >
      <div
        className="bg-white dark:bg-gray-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {data.title}
        </h2>

        <img
          src={data.image}
          alt={data.title}
          className="w-full max-h-[400px] object-contain rounded-md mb-4"
        />

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          📅 {data.date}
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {data.detail || 'Detaylı açıklama bulunmamaktadır.'}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementModal;
