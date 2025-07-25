"use client"

import { useEffect, useState } from "react"
import "./dashboard.css"
import {
  Person,
  Campaign,
  Phone,
  AssignmentInd,
  TrendingUp,
  CalendarToday,
  AccessTime,
  Notifications,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

function DashboardPage() {
  const { loggedAdmin } = useSelector((state) => state.auth)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Zamanı güncelle
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString("tr-TR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="dashboard-title">Hoş Geldiniz</h1>
          <p className="dashboard-subtitle">Atakum Belediyesi Yönetim Paneli - {loggedAdmin?.username || "Yönetici"}</p>
        </div>
        <div className="datetime-section">
          <div className="current-date">
            <CalendarToday style={{ marginRight: "8px", fontSize: "1.2rem" }} />
            {formatDate(currentTime)}
          </div>
          <div className="current-time">
            <AccessTime style={{ marginRight: "8px", fontSize: "1.2rem" }} />
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Hızlı İşlemler */}
      <div className="quick-actions-section">
        <h2 className="section-title">
          <TrendingUp style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Hızlı İşlemler
        </h2>

        <div className="quick-actions-grid">
          {loggedAdmin.allowPersonel != 0 && (
            <Link to="/personeller" className="quick-action-card">
              <div className="action-icon personel">
                <Person />
              </div>
              <div className="action-content">
                <h3>Personel Yönetimi</h3>
                <p>Personel bilgilerini görüntüle ve düzenle</p>
              </div>
            </Link>
          )}

          {loggedAdmin.allowDuyuru != 0 && (
            <Link to="/duyuru" className="quick-action-card">
              <div className="action-icon duyuru">
                <Campaign />
              </div>
              <div className="action-content">
                <h3>Duyuru Yönetimi</h3>
                <p>Duyuruları oluştur ve yönet</p>
              </div>
            </Link>
          )}

          {loggedAdmin.allowPhones != 0 && (
            <Link to="/numaralar" className="quick-action-card">
              <div className="action-icon telefon">
                <Phone />
              </div>
              <div className="action-content">
                <h3>Telefon Rehberi</h3>
                <p>Dahili numaraları görüntüle</p>
              </div>
            </Link>
          )}

          {loggedAdmin.allowMudurlukler != 0 && (
            <Link to="/mudurlukler" className="quick-action-card">
              <div className="action-icon mudurluk">
                <AssignmentInd />
              </div>
              <div className="action-content">
                <h3>Müdürlük Yönetimi</h3>
                <p>Müdürlük bilgilerini yönet</p>
              </div>
            </Link>
          )}

          {loggedAdmin.allowAnket != 0 && (
            <Link to="/anketler" className="quick-action-card">
              <div className="action-icon anket">
                <Notifications />
              </div>
              <div className="action-content">
                <h3>Anket Yönetimi</h3>
                <p>Anketleri oluştur ve sonuçları görüntüle</p>
              </div>
            </Link>
          )}

          {loggedAdmin.allowAdmins != 0 && (
            <Link to="/adminler" className="quick-action-card">
              <div className="action-icon admin">
                <Person />
              </div>
              <div className="action-content">
                <h3>Sistem Yöneticileri</h3>
                <p>Yönetici hesaplarını yönet</p>
              </div>
            </Link>
          )}
          {loggedAdmin.allowGirisler != 0 && (
            <Link to="/girisler" className="quick-action-card">
              <div className="action-icon personel">
                <Person />
              </div>
              <div className="action-content">
                <h3>Giriş-Çıkış Takibi</h3>
                <p>Personel giriş-çıkışlarını takip et</p>
              </div>
            </Link>
          )}
          {loggedAdmin.allowMudurs != 0 && (
            <Link to="/mudurler" className="quick-action-card">
              <div className="action-icon mudurluk">
                <AssignmentInd />
              </div>
              <div className="action-content">
                <h3>Müdür Yönetimi</h3>
                <p>Müdür giriş bilgilerini güncelle</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
