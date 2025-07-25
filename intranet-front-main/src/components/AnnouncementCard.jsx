import React from 'react';

const AnnouncementCard = ({ title, date, image, onClick }) => {
  return (
<div
  onClick={onClick}
  className="bg-white dark:bg-gray-800 rounded shadow p-4 w-full h-full cursor-pointer hover:scale-[1.02] transition-transform flex flex-col"
>
  <img
    src={image}
    alt={title}
    className="w-full h-40 object-cover rounded-md mb-3"
  />
  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">📅 {date}</p>
  <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">{title}</h3>
</div>

  );
};

export default AnnouncementCard;
