import React from 'react';
import { CakeIcon } from '@heroicons/react/24/solid';

const BirthdayCard = ({ person }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 w-full border border-gray-200 dark:border-gray-700 text-center">
      <div className="flex justify-center items-center mb-4">
        <CakeIcon className="w-5 h-5 text-pink-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Doğum Günleri
        </h3>
      </div>

      {person ? (
        <>
          <img
            src={person.image}
            alt={person.name}
            className="mx-auto w-28 h-28 rounded-full object-cover border-2 border-pink-500 shadow-md mb-2"
          />
          <p className="mt-1 font-semibold text-gray-800 dark:text-white text-[16px]">
            {person.name} {person.surname}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{person.kurum}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{person.unvan}</p>
        </>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">Bugün doğan kimse yok.</p>
      )}
    </div>
  );
};

export default BirthdayCard;
