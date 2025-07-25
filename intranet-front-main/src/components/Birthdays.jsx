import React, { useEffect, useState } from 'react';
import BirthdayCard from './BirthdayCard';
import BirthdayModal from './BirthdayModal';
import { getBirthdays } from '../api/services';
import defaultProfilePicture from '../assets/icons/users.png';

export default function Birthdays({ forceOpen, onClose, onClick }) {
  const [todayList, setTodayList] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getBirthdays().then((res) => {
      const persons = res?.data?.data?.users;
      if (Array.isArray(persons)) {
        const updatedPersons = persons.map((person) => {
          const birthDate = new Date(person.DogumTarihi);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          return {
            id: person.ID,
            name: person.Adi,
            surname: person.Soyadi,
            image: person.Resim ? `${import.meta.env.VITE_APP_URL}/kullanici/${person.Resim}` : defaultProfilePicture,
            unvan: person.Unvani || '',
            kurum: person.Kurum || '',
            age,
          };
        });
        setTodayList(updatedPersons);
      }
    });
  }, []);

  useEffect(() => {
    if (todayList.length > 0) {
      const interval = setInterval(() => {
        setIndex((i) => (i + 1) % todayList.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [todayList]);

  useEffect(() => {
    if (forceOpen) setModalOpen(true);
  }, [forceOpen]);

  const person = todayList[index];

  return (
    <>
      <div onClick={onClick} className="cursor-pointer">
        <BirthdayCard person={person} />
      </div>
      {modalOpen && (
        <BirthdayModal
          list={todayList}
          onClose={() => {
            setModalOpen(false);
            onClose?.();
          }}
        />
      )}
    </>
  );
}
