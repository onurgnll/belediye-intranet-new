"use client"

import { useEffect, useState } from "react"
import { requestWithAuth } from "../../helpers/requests"
import CreateAnket from "./CreateAnket"
import "./anket.css"
import { useNavigate } from "react-router-dom"
import { Delete, Poll, Add, Star, Assessment } from "@mui/icons-material"
import { Skeleton } from "@mui/material"

function Anketler() {
  const [surveys, setSurveys] = useState()
  const [mainAnket, setmainAnket] = useState()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getSurveys = async () => {
    try {
      const resp = await requestWithAuth("get", "/admin/get-anketler")
      setSurveys(resp.data.surveys)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getMainSurvey = async () => {
    try {
      const resp = await requestWithAuth("get", "/admin/get-main-anket")
      setmainAnket(resp.data.anket)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAnket = async (e) => {
    try {
      const resp = await requestWithAuth("delete", "/admin/delete-anket/" + e)
      setSurveys(resp.data.surveys)
      getSurveys()
      getMainSurvey()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSurveys()
    getMainSurvey()
  }, [])

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const SkeletonCard = () => (
    <div className="anket-card skeleton">
      <Skeleton variant="rectangular" width="100%" height={120} />
      <div className="anket-card-content">
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="60%" height={16} />
      </div>
    </div>
  )

  return (
    <div className="anket-container">
      <CreateAnket open={open} handleClose={handleClose} getAnketler={getSurveys} getMainSurvey={getMainSurvey} />

      {/* Header */}
      <div className="anket-header">
        <div className="anket-title-section">
          <h1 className="anket-title">
            <Assessment className="title-icon" />
            Anket Yönetimi
          </h1>
          <p className="anket-subtitle">Vatandaş anketlerini oluşturun ve yönetin</p>
        </div>

        <div className="anket-stats">
          <div className="stat-card">
            <div className="stat-icon main">
              <Star />
            </div>
            <div className="stat-content">
              <div className="stat-value">{mainAnket ? 1 : 0}</div>
              <div className="stat-label">Önemli Anket</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon secondary">
              <Poll />
            </div>
            <div className="stat-content">
              <div className="stat-value">{loading ? <Skeleton width={30} /> : surveys?.length || 0}</div>
              <div className="stat-label">Toplam Anket</div>
            </div>
          </div>
        </div>

        <button onClick={handleClickOpen} className="olusturbutton">
          <Add />
          Yeni Anket Oluştur
        </button>
      </div>

      {/* Main Survey Section */}
      {mainAnket && (
        <div className="anket-section">
          <div className="section-header">
            <div className="section-title">
              <Star className="section-icon" />
              <span>Önemli Anket</span>
              <span className="section-badge important">Kullanıcıların ilk gördüğü anket</span>
            </div>
          </div>

          <div className="anket-grid">
            <div className="anket-card featured" onClick={() => navigate("/anket/" + mainAnket.id)}>
              <div className="anket-card-header">
                <div className="anket-status important">
                  <Star />
                  Önemli
                </div>
                <button
                  className="delete-anket-button"
                  onClick={async (e) => {
                    e.stopPropagation()
                    const confirmed = confirm("Bu anketi silmek istiyor musunuz?")
                    if (confirmed) {
                      await deleteAnket(mainAnket.id)
                      getSurveys()
                    }
                  }}
                >
                  <Delete />
                </button>
              </div>

              <div className="anket-card-content">
                <h3 className="anket-card-title">{mainAnket.title}</h3>
                <p className="anket-card-description">
                  Bu anket kullanıcıların sisteme giriş yaptığında karşılaştığı önemli ankettir.
                </p>
              </div>

              <div className="anket-card-footer">
                <span className="anket-card-action">Anketi Görüntüle →</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Surveys Section */}
      <div className="anket-section">
        <div className="section-header">
          <div className="section-title">
            <Poll className="section-icon" />
            <span>Diğer Anketler</span>
            <span className="section-badge">{loading ? <Skeleton width={20} /> : surveys?.length || 0} anket</span>
          </div>
        </div>

        {loading ? (
          <div className="anket-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : surveys?.length > 0 ? (
          <div className="anket-grid">
            {surveys.map((element) => (
              <div key={element.id} className="anket-card" onClick={() => navigate("/anket/" + element.id)}>
                <div className="anket-card-header">
                  <div className="anket-status">
                    <Poll />
                    Aktif
                  </div>
                  <button
                    className="delete-anket-button"
                    onClick={async (e) => {
                      e.stopPropagation()
                      const confirmed = confirm("Bu anketi silmek istiyor musunuz?")
                      if (confirmed) {
                        await deleteAnket(element.id)
                        getSurveys()
                      }
                    }}
                  >
                    <Delete />
                  </button>
                </div>

                <div className="anket-card-content">
                  <h3 className="anket-card-title">{element.title}</h3>
                  <p className="anket-card-description">Vatandaşlarımızın görüşlerini almak için hazırlanmış anket.</p>
                </div>

                <div className="anket-card-footer">
                  <span className="anket-card-action">Anketi Görüntüle →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Poll />
            </div>
            <div className="empty-state-title">Henüz anket bulunmuyor</div>
            <div className="empty-state-description">
              İlk anketinizi oluşturmak için "Yeni Anket Oluştur" butonuna tıklayın.
            </div>
            <button onClick={handleClickOpen} className="olusturbutton">
              <Add />
              İlk Anketi Oluştur
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Anketler
