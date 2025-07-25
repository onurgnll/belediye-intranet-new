import React from 'react';
import useEscapeKey from '../utils/useEscapeKey';

const BirthdayModal = ({ list, onClose }) => {
 useEscapeKey(onClose);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="text-gray-400 dark:text-gray-500 hover:text-red-500 text-2xl absolute top-3 right-4"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-black-700 dark:text-white mb-6">
          Doğum Günü Kutlamaları
        </h2>

        {list.length === 0 ? (
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Bugün doğum günü olan çalışan yok.
          </p>
        ) : (
          <ul className="space-y-5">
            {list.map((person) => (
              <li
                key={person.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <img
                  src={person.image}
                  alt={`${person.name} ${person.surname}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-500 shadow-md"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 dark:text-white text-base">
                    {person.name} {person.surname}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 italic">
                    {person.unvan || ''}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {person.kurum || ''}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">{person.age} yaşında</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BirthdayModal;
