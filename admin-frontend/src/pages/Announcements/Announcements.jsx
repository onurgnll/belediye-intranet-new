"use client"

import { useEffect, useState } from "react"
import { requestWithAuth } from "../../helpers/requests"
import "./announcement.css"
import { Campaign, Add, CalendarToday, Visibility } from "@mui/icons-material"
import CreateAnnouncement from "./CreateAnnouncement"
import AnnDetails from "./AnnDetails"

function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [mainDuyuru, setmainDuyuru] = useState()
  const [loading, setLoading] = useState(true)

  const getAnnouncements = async () => {
    try {
      const announcements = await requestWithAuth("get", "/admin/get-duyurular")
      setAnnouncements(announcements.data.duyurular)
    } catch (error) {
      console.error("Error fetching announcements:", error)
    }
  }

  const getMainAnnouncm = async () => {
    try {
      const announcements = await requestWithAuth("get", "/admin/get-main-duyuru")
      setmainDuyuru(announcements.data.duyuru)
    } catch (error) {
      console.error("Error fetching main announcement:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMainAnnouncm()
    getAnnouncements()
  }, [])

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bu duyuruyu silmek istediğinizden emin misiniz?")
    if (confirmDelete) {
      await requestWithAuth("delete", "/admin/delete-duyuru/", id)
      getAnnouncements()
      getMainAnnouncm()
    }
  }

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [ann, setAnn] = useState()
  const [open2, setOpen2] = useState(false)
  const handleClickOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="announcements-container">
        <div className="announcements-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
        <div className="main-announcement-section">
          <div className="skeleton skeleton-title"></div>
          <div style={{ height: "200px" }} className="skeleton"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="announcements-container">
      <AnnDetails
        getAnnouncements={getAnnouncements}
        getMainAnnouncm={getMainAnnouncm}
        open={open2}
        handleClose={handleClose2}
        ann={ann}
      />
      <CreateAnnouncement
        getMainAnn={getMainAnnouncm}
        fetchData={getAnnouncements}
        open={open}
        handleClose={handleClose}
      />

      {/* Header */}
      <div className="announcements-header">
        <div>
          <h1 className="announcements-title">Duyuru Yönetimi</h1>
          <p className="announcements-subtitle">Belediye duyurularını yönetin ve düzenleyin</p>
        </div>
        <div className="create-button-container">
          <button onClick={handleClickOpen} className="olusturbutton">
            <Add style={{ marginRight: "8px", fontSize: "1rem" }} />
            Yeni Duyuru Oluştur
          </button>
        </div>
      </div>

      {/* Ana Duyuru */}
      {mainDuyuru && (
        <div className="main-announcement-section">
          <h2 className="section-title">
            <Campaign style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Önemli Duyuru
          </h2>
          <div
            className="main-announcement-card"
            onClick={() => {
              setAnn(mainDuyuru)
              setOpen2(true)
            }}
          >
            <div className="announcement-content">
              {mainDuyuru?.duyuruResimler?.length > 0 && (
                <img
                  className="announcement-image"
                  src={`${import.meta.env.VITE_APP_URL}/duyuru/${mainDuyuru.duyuruResimler[0].resim}`}
                  alt={mainDuyuru.title}
                />
              )}
              <div className="announcement-info">
                <h3 className="announcement-title">{mainDuyuru.title}</h3>
                <div className="announcement-meta">
                {/*<span>
                    <CalendarToday style={{ fontSize: "1rem", marginRight: "4px", verticalAlign: "middle" }} />
                    {formatDate(mainDuyuru.createdAt)}
                  </span>
                */}
                  <span>
                    <Visibility style={{ fontSize: "1rem", marginRight: "4px", verticalAlign: "middle" }} />
                    Detayları görüntülemek için tıklayın
                  </span>
                </div>
                {mainDuyuru.description && <p className="announcement-description">{mainDuyuru.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diğer Duyurular */}
      <div className="other-announcements-section">
        <h2 className="section-title">
          <Campaign style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Diğer Duyurular
        </h2>

        {announcements?.length > 0 ? (
          <div className="announcements-grid">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="announcement-card"
                onClick={() => {
                  setAnn(ann)
                  setOpen2(true)
                }}
              >
                {ann?.duyuruResimler?.length > 0 && (
                  <img
                    className="card-image"
                    src={`${import.meta.env.VITE_APP_URL}/duyuru/${ann.duyuruResimler[0].resim}`}
                    alt={ann.title}
                  />
                )}
                <h3 className="card-title">{ann.title}</h3>
                <div className="card-meta">
                  <CalendarToday style={{ fontSize: "0.875rem", marginRight: "4px", verticalAlign: "middle" }} />
                  {formatDate(ann.createdAt)}
                </div>
                {ann.description && <p className="card-description">{ann.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-announcements">
            <div className="no-announcements-icon">📢</div>
            <h3 className="no-announcements-title">Henüz duyuru bulunmuyor</h3>
            <p className="no-announcements-description">
              İlk duyurunuzu oluşturmak için yukarıdaki "Yeni Duyuru Oluştur" butonunu kullanın.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Announcements
