import React, { useEffect, useRef, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import Notifications from '../components/Notifications';
import Birthdays from '../components/Birthdays';
import AnnouncementModal from '../components/AnnouncementModal';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import { getDuyurular } from '../api/services';

export default function HomePage({ showBirthdayModal, setShowBirthdayModal }) {
  const [duyurular, setDuyurular] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [mainAnnouncement, setMainAnnouncement] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (showBirthdayModal) {
      setShowBirthdayModal(false); 
    }
  }, [showBirthdayModal]);

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
            isMain: d.isMain,
          }));

          setDuyurular(formatted);

          const mainDuyuru = formatted.find((d) => d.isMain === 1);
          if (mainDuyuru) setMainAnnouncement(mainDuyuru);
        }
      })
      .catch((err) => {
        console.error('Duyurular alınamadı:', err);
      });
  }, []);

  const closeModal = () => setSelectedAnnouncement(null);
  const closeMainModal = () => setMainAnnouncement(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="p-6 space-y-6">
        {/* Duyurular */}
        <section>
          <div className="flex items-center mb-4">
            <MegaphoneIcon className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Duyurular</h2>
          </div>
          <div ref={scrollRef} className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar pb-2">
            {duyurular.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-80 h-[300px]">
                <AnnouncementCard
                  title={item.title}
                  date={item.date}
                  image={item.image}
                  onClick={() => setSelectedAnnouncement(item)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Bildirim ve Doğum Günleri */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Notifications />
          <Birthdays
            forceOpen={showBirthdayModal}
            onClose={() => setShowBirthdayModal(false)}
            onClick={() => setShowBirthdayModal(true)}
          />
        </section>
      </main>

      {selectedAnnouncement && (
        <AnnouncementModal
          visible
          data={selectedAnnouncement}
          onClose={closeModal}
        />
      )}

      {mainAnnouncement && (
        <AnnouncementModal
          visible
          data={mainAnnouncement}
          onClose={closeMainModal}
        />
      )}
    </div>
  );
}
