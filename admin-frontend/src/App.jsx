"use client"

import { useEffect, useState } from "react"
import "./App.css"
import logo from "./assets/200180283_darkmode.png"
import { AssignmentInd, Campaign, Lan, Logout, Person, Phone, Poll, Dashboard, AccessTime } from "@mui/icons-material"
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom"
import Announcements from "./pages/Announcements/Announcements"
import Anketler from "./pages/Anketler/Anketler"
import Mudurlukler from "./pages/Mudurlukler/Mudurlukler"
import Telephones from "./pages/Telephones/Telephones"
import Personeller from "./pages/Personeller/Personeller"
import Anket from "./pages/Anketler/Anket"
import { useDispatch, useSelector } from "react-redux"
import LoginPage from "./pages/Login/LoginPage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Clients from "./pages/Clients/Clients"
import Adminler from "./pages/AdminPage/Adminler"
import NoPermissionPage from "./pages/NoPermissionPage"
import { setLoggedAdmin, setLoggedStatus } from "./redux/features/authSlice"
import Mudurs from "./pages/Mudurler/Mudurs"
import DashboardPage from "./pages/Dashboard/Dashboard"
import Girisler from "./pages/Girisler/Girisler"

function App() {
  const { logged, loggedUser, loggedAdmin } = useSelector((state) => state.auth)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem("darkMode", (!darkMode).toString())
  }

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === "true")
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
  }, [darkMode])

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="loading">Sistem yükleniyor...</div>
      </div>
    )
  }

  return (
    <>
      {logged ? (
        <div className="d-flex">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="logo-container">
              <img
                onClick={() => {
                  window.location.href = "https://atakum.bel.tr/"
                }}
                src={logo || "/placeholder.svg"}
                alt="Atakum Belediyesi Logo"
              />
            </div>

            <nav className="sidebar-nav">
              <Link to={"/dashboard"} className={`sidebar-link ${isActiveRoute("/dashboard") ? "active" : ""}`}>
                <Dashboard />
                <span>Yönetim Paneli</span>
              </Link>

              {loggedAdmin.allowPersonel != 0 && (
                <Link to={"/personeller"} className={`sidebar-link ${isActiveRoute("/personeller") ? "active" : ""}`}>
                  <Person />
                  <span>Personel Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowGirisler != 0 && (
                <Link to={"/girisler"} className={`sidebar-link ${isActiveRoute("/girisler") ? "active" : ""}`}>
                  <AccessTime />
                  <span>Giriş-Çıkış Takibi</span>
                </Link>
              )}

              {loggedAdmin.allowMudurlukler != 0 && (
                <Link to={"/mudurlukler"} className={`sidebar-link ${isActiveRoute("/mudurlukler") ? "active" : ""}`}>
                  <AssignmentInd />
                  <span>Müdürlük Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowMudurs != 0 && (
                <Link to={"/mudurler"} className={`sidebar-link ${isActiveRoute("/mudurler") ? "active" : ""}`}>
                  <Person />
                  <span>Müdür Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowDuyuru != 0 && (
                <Link to={"/duyuru"} className={`sidebar-link ${isActiveRoute("/duyuru") ? "active" : ""}`}>
                  <Campaign />
                  <span>Duyuru Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowPhones != 0 && (
                <Link to={"/numaralar"} className={`sidebar-link ${isActiveRoute("/numaralar") ? "active" : ""}`}>
                  <Phone />
                  <span>Telefon Rehberi</span>
                </Link>
              )}

              {loggedAdmin.allowIPS != 0 && (
                <Link to={"/ipler"} className={`sidebar-link ${isActiveRoute("/ipler") ? "active" : ""}`}>
                  <Lan />
                  <span>IP Adres Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowAnket != 0 && (
                <Link to={"/anketler"} className={`sidebar-link ${isActiveRoute("/anketler") ? "active" : ""}`}>
                  <Poll />
                  <span>Anket Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowAdmins != 0 && (
                <Link to={"/adminler"} className={`sidebar-link ${isActiveRoute("/adminler") ? "active" : ""}`}>
                  <Person />
                  <span>Sistem Yöneticileri</span>
                </Link>
              )}

              <button
                onClick={() => {
                  const confirmLogout = confirm("Sistemden çıkmak istediğinizden emin misiniz?")
                  if (confirmLogout) {
                    localStorage.clear()
                    dispatch(setLoggedStatus(false))
                    dispatch(setLoggedAdmin(null))
                  }
                }}
                className="sidebar-link logout-button"
              >
                <Logout />
                <span>Güvenli Çıkış</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/duyuru" element={loggedAdmin.allowDuyuru ? <Announcements /> : <NoPermissionPage />} />
              <Route path="/numaralar" element={loggedAdmin.allowPhones ? <Telephones /> : <NoPermissionPage />} />
              <Route path="/personeller" element={loggedAdmin.allowPersonel ? <Personeller /> : <NoPermissionPage />} />
              <Route path="/anketler" element={loggedAdmin.allowAnket ? <Anketler /> : <NoPermissionPage />} />
              <Route
                path="/mudurlukler"
                element={loggedAdmin.allowMudurlukler ? <Mudurlukler /> : <NoPermissionPage />}
              />
              <Route path="/ipler" element={loggedAdmin.allowIPS ? <Clients /> : <NoPermissionPage />} />
              <Route path="/anket/:id" element={loggedAdmin.allowAnket ? <Anket /> : <NoPermissionPage />} />
              <Route path="/adminler" element={loggedAdmin.allowAdmins ? <Adminler /> : <NoPermissionPage />} />
              <Route path="/mudurler" element={<Mudurs />} />
              <Route path="/girisler" element={<Girisler />} />
            </Routes>
          </main>
        </div>
      ) : (
        <LoginPage />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastStyle={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "14px",
        }}
      />
    </>
  )
}

export default App
