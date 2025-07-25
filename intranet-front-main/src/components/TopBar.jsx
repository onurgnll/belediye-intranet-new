"use client"

import { useEffect, useState } from "react"
import {
  HomeIcon,
  PhoneIcon,
  CakeIcon,
  ClipboardDocumentListIcon,
  CloudIcon,
  MegaphoneIcon,
  UserGroupIcon, // New icon for personnel attendance
} from "@heroicons/react/24/outline"
import { useNavigate, useLocation } from "react-router-dom"
import { isLoggedIn } from "../utils/auth" // New import

const menuItems = [
  { label: "Anasayfa", icon: HomeIcon, path: "/" },
  { label: "Duyurular", icon: MegaphoneIcon, path: "/duyurular" },
  { label: "Dahili Numaralar", icon: PhoneIcon, path: "/internal-numbers" },
  { label: "Doğum Günleri", icon: CakeIcon, path: "trigger-birthday-modal" },
  { label: "Anketler", icon: ClipboardDocumentListIcon, path: "/anket" },
  { label: "Hava Durumu", icon: CloudIcon, path: "external-weather" },
]

export default function TopBar({ onTriggerBirthday }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [managerLoggedIn, setManagerLoggedIn] = useState(false) // New state

  useEffect(() => {
    setManagerLoggedIn(isLoggedIn()) // Check login status on mount and route change
  }, [location.pathname]) // Re-check when route changes

  const handleClick = (path) => {
    switch (path) {
      case "trigger-birthday-modal":
        onTriggerBirthday?.()
        break
      case "external-weather":
        window.open("https://www.mgm.gov.tr/tahmin/il-ve-ilceler.aspx?il=Samsun", "_blank")
        break
      default:
        navigate(path)
    }
  }

  return (
    <nav className="fixed top-[72px] w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="max-w-7xl mx-auto flex justify-center gap-10 px-4 py-2">
        {menuItems.map(({ icon: Icon, label, path }, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(path)}
            className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition"
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </div>
        ))}
        {managerLoggedIn && ( // Conditionally render the new button
          <div
            onClick={() => handleClick("/mudur/personel-giris-cikis")}
            className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition"
          >
            <UserGroupIcon className="w-5 h-5" />
            <span>Personel Giriş Çıkış</span>
          </div>
        )}
      </div>
    </nav>
  )
}
