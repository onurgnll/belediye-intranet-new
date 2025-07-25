"use client"

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import HomePage from "./pages/HomePage"
import Anket from "./pages/Anket"
import AnketPage from "./pages/AnketPage"
import InternalNumbers from "./pages/InternalNumbers"
import AllAnnouncements from "./pages/AllAnnouncements"
import Header from "./components/Header"
import TopBar from "./components/TopBar"
import Footer from "./components/Footer"
import BirthdayModal from "./components/BirthdayModal"
import { getBirthdays } from "./api/services"
import ManagerLoginPage from "./pages/ManagerLoginPage" // New import
import PersonnelAttendancePage from "./pages/PersonnelAttendancePage" // New import

function AppContent() {
  const [showBirthdayModal, setShowBirthdayModal] = useState(false)
  const [todayBirthdays, setTodayBirthdays] = useState([])

  const location = useLocation() // Mevcut route'u al
  useEffect(() => {
    getBirthdays().then((res) => {
      const persons = res?.data?.data?.users || []
      const list = persons.map((person) => {
        const birthDate = new Date(person.DogumTarihi)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        return {
          id: person.ID,
          name: person.Adi,
          surname: person.Soyadi,
          image: person.Resim ? `${import.meta.env.VITE_APP_URL}/kullanici/${person.Resim}` : "/default.jpg",
          unvan: person.Unvani || "",
          kurum: person.Kurum || "",
          age,
        }
      })
      setTodayBirthdays(list)
    })
  }, [])

  return (
    <>
      <Header />
      <TopBar onTriggerBirthday={() => setShowBirthdayModal(true)} />

      <Routes>
        <Route
          path="/"
          element={<HomePage showBirthdayModal={showBirthdayModal} setShowBirthdayModal={setShowBirthdayModal} />}
        />
        <Route path="/duyurular" element={<AllAnnouncements />} />
        <Route path="/anket" element={<Anket />} />
        <Route path="/anketPage/:id" element={<AnketPage />} />
        <Route path="/internal-numbers" element={<InternalNumbers />} />
        <Route path="/mudur/login" element={<ManagerLoginPage />} /> {/* New Route */}
        <Route path="/mudur/personel-giris-cikis" element={<PersonnelAttendancePage />} /> {/* New Route */}
      </Routes>

      {showBirthdayModal && <BirthdayModal list={todayBirthdays} onClose={() => setShowBirthdayModal(false)} />}

      {location.pathname === "/" && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen pt-[128px] bg-gray-50 dark:bg-gray-900">
        <AppContent />
      </div>
    </Router>
  )
}
