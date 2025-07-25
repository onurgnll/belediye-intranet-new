"use client"

import { useEffect, useState } from "react"
import "./App.css"
import logo from "./assets/200180283.png"
import {
  AssignmentInd,
  Campaign,
  Lan,
  Logout,
  Person,
  Phone,
  Poll,
  DarkMode,
  LightMode,
  Dashboard,
  AccessTime,
  Menu,
  Close,
} from "@mui/icons-material"
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem("darkMode", (!darkMode).toString())
  }

  // Sidebar toggle for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === "true")
    }
    setLoading(false)
  }, [])

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
  }, [darkMode])

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner"></div>
        <div className="ml-3">Sistem yükleniyor...</div>
      </div>
    )
  }

  return (
    <>
      {logged ? (
        <div style={{ height: "100vh" }} className="row m-0">
          {/* Mobile Menu Button (only visible on small screens) */}
          <button
            className="d-md-none"
            onClick={toggleSidebar}
            style={{
              position: "fixed",
              top: "16px",
              left: "16px",
              zIndex: 1060,
              background: "var(--surface-color)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--border-radius)",
              padding: "8px",
              cursor: "pointer",
              boxShadow: "var(--shadow-light)",
            }}
          >
            {sidebarOpen ? <Close /> : <Menu />}
          </button>

          {/* Dark Mode Toggle 
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Tema değiştir" title="Tema Değiştir">
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>*/}

          {/* Sidebar */}
          <div className={`col-3 sidebar d-flex flex-column align-items-center p-0 ${sidebarOpen ? "open" : ""}`}>
            <div className="logo-container">
              <img
                onClick={() => {
                  window.location.href = "https://atakum.bel.tr/"
                }}
                style={{ width: "70%", cursor: "pointer" }}
                src={logo || "/placeholder.svg"}
                alt="Atakum Belediyesi Logo"
              />
              <div className="belediye-logo-text">Atakum Belediyesi</div>
            </div>
            <div className="w-60 d-flex flex-column align-items-center px-2">
              {/* Dashboard Link */}
              <Link to={"/dashboard"} className={`buttonmainpage ${isActiveRoute("/dashboard") ? "active" : ""}`}>
                <div className="iconmainpagebutton">
                  <Dashboard />
                </div>
                <span className="mx-2">Yönetim Paneli</span>
              </Link>

              {loggedAdmin.allowPersonel != 0 && (
                <Link to={"/personeller"} className={`buttonmainpage ${isActiveRoute("/personeller") ? "active" : ""}`}>
                  <div className="iconmainpagebutton">
                    <Person />
                  </div>
                  <span className="mx-2">Personel Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowMudurlukler != 0 && (
                <Link to={"/mudurlukler"} className={`buttonmainpage ${isActiveRoute("/mudurlukler") ? "active" : ""}`}>
                  <div className="iconmainpagebutton">
                    <AssignmentInd />
                  </div>
                  <span className="mx-2">Müdürlük Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowMudurs != 0 && (
                <Link to={"/mudurler"} className={`buttonmainpage ${isActiveRoute("/mudurler") ? "active" : ""}`}>
                  <div className="iconmainpagebutton">
                    <Person />
                  </div>
                  <span className="mx-2">Müdür Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowDuyuru != 0 && (
                <Link to={"/duyuru"} className={`buttonmainpage ${isActiveRoute("/duyuru") ? "active" : ""}`}>
                  <div className="iconmainpagebutton">
                    <Campaign />
                  </div>
                  <span className="mx-2">Duyuru Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowPhones != 0 && (
                <Link to={"/numaralar"} className={`buttonmainpage ${isActiveRoute("/numaralar") ? "active" : ""}`}>
                  <div className="iconmainpagebutton">
                    <Phone />
                  </div>
                  <span className="mx-2">Telefon Rehberi</span>
                </Link>
              )}

              {loggedAdmin.allowIPS != 0 && (
                <Link to={"/ipler"} className={`buttonmainpage ${isActiveRoute("/ipler") ? "active" : ""}`}>
                  <div className="iconmainpagebutton">
                    <Lan />
                  </div>
                  <span className="mx-2">IP Adres Yönetimi</span>
                </Link>
              )}

              {loggedAdmin.allowAnket != 0 && (
                <Link to={"/anketler"} className={`buttonmainpage ${isActiveRoute("/anketler") ? "active" : ""}`}>
                  <div className="iconmainpagebutton">
                    <Poll />
                  </div>
                  <span className="mx-2">Anket Yönetimi</span>
                </Link>
              )}

              {/* Giriş-Çıkış Takibi */}
              <Link to={"/girisler"} className={`buttonmainpage ${isActiveRoute("/girisler") ? "active" : ""}`}>
                <div className="iconmainpagebutton">
                  <AccessTime />
                </div>
                <span className="mx-2">Giriş-Çıkış Takibi</span>
              </Link>

              {loggedAdmin.allowAdmins != 0 && (
                <Link to={"/adminler"} className={`buttonmainpage ${isActiveRoute("/adminler") ? "active" : ""}`}>
                  <div className="iconmainpagebutton">
                    <Person />
                  </div>
                  <span className="mx-2">Sistem Yöneticileri</span>
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
                className="buttonmainpage"
                style={{ marginTop: "auto" }}
              >
                <div className="iconmainpagebutton33">
                  <Logout />
                </div>
                <span className="mx-2">Güvenli Çıkış</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-9 main-content overflow-auto">
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
          </div>
        </div>
      ) : (
        <div>
          <LoginPage />
        </div>
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
