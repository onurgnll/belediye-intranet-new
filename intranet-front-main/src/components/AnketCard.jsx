import React from 'react';
import {
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { isSurveyAnswered } from '../utils/anketHolder';

export default function AnketCard({ survey }) {
  const {
    id,
    title,
    description,
    image,
    startDate,
    endDate,
    importance = '',
  } = survey;

  const importanceIcon = (
    <ExclamationTriangleIcon
      className={`w-5 h-5 ${
        importance === 'high'
          ? 'text-red-500'
          : importance === 'medium'
          ? 'text-yellow-500'
          : 'text-gray-400'
      }`}
      title={importance}
    />
  );

  const answered = isSurveyAnswered(id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-64 h-48 flex flex-col items-center justify-start overflow-hidden shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
      <div className="w-full h-28 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <ClipboardDocumentCheckIcon className="w-10 h-10 text-gray-500 dark:text-gray-300" />
        )}
      </div>

      <div className="flex flex-col justify-between px-3 py-2 text-center flex-1 w-full">
        <div className="flex justify-center items-center gap-1 mb-1">
           {importanceIcon}
          <h3 className="text-md font-semibold text-gray-800 dark:text-white line-clamp-1">
            {title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
          {description}
        </p>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          {/* <p>📅 Başlangıç: {startDate || 'Bilinmiyor'}</p>
          <p>⏳ Bitiş: {endDate || 'Bilinmiyor'}</p> */}
          <p className="flex items-center justify-center gap-1">
            {answered ? (
              <>
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                Yapıldı
              </>
            ) : (
              <>
                <XCircleIcon className="w-4 h-4 text-red-500" />
                Yapılmadı
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
