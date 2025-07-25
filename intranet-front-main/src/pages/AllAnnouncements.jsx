import React, { useEffect, useState } from 'react';
import { getDuyurular } from '../api/services';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import AnnouncementModal from '../components/AnnouncementModal';
import AnnouncementBox from '../components/AnnouncementBox';

export default function AllAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getDuyurular()
      .then((res) => {
        const list = res?.data?.data?.duyurular;
        if (Array.isArray(list)) {
          const formatted = list.map((d) => ({
            id: d.id,
            title: d.title,
            date: '',
            detail: d.content,
            image: d.duyuruResimler?.[0]?.resim
              ? `${import.meta.env.VITE_APP_URL}/duyuru/${d.duyuruResimler[0].resim}`
              : '/default.jpg',
          }));
          setAnnouncements(formatted);
        }
      })
      .catch((err) => {
        console.error('Duyurular alınamadı:', err);
      });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="flex items-center mb-6">
        <MegaphoneIcon className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">Tüm Duyurular</h2>
      </div>

      {announcements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {announcements.map((item) => (
        <AnnouncementBox
      key={item.id}
      title={item.title}
      date={item.date}
      image={item.image}
      detail={item.detail}
      onClick={() => setSelected(item)}
        />
        ))}
        </div>

      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">Gösterilecek duyuru bulunamadı.</p>
      )}

      {selected && (
        <AnnouncementModal
          visible
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
