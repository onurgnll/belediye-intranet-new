import React, { useEffect, useState } from 'react';
import { getDuyurular } from '../api/services';
import AnnouncementCard from './AnnouncementCard';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDuyurular()
      .then((res) => {
        const list = res?.data?.data?.duyurular;
        if (Array.isArray(list)) {
          setAnnouncements(list);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="text-red-500 dark:text-red-400">Duyurular alınamadı.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {announcements.length > 0 ? (
        announcements.map((duyuru) => (
          <AnnouncementCard key={duyuru.id} duyuru={duyuru} />
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Gösterilecek duyuru bulunamadı.</p>
      )}
    </div>
  );
}
