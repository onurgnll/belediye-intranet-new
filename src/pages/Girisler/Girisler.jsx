"use client"

import { useEffect, useState } from "react"
import { requestWithAuth } from "../../helpers/requests"
import { FormControl, InputLabel, MenuItem, Select, TextField, Skeleton } from "@mui/material"
import ReactPaginate from "react-paginate"
import "./girisler.css"
import {
  NavigateBefore,
  NavigateNext,
  Person,
  FilterList,
  AccessTime,
  CheckCircle,
  Warning,
  Cancel,
  CloudDownload,
} from "@mui/icons-material"
import { formatDate, formatTime } from "../../helpers/formatDate"
import { Popconfirm, DatePicker, Radio } from "antd"

const { RangePicker } = DatePicker

function Girisler() {
  const [name, setName] = useState("")
  const [page, setPage] = useState(1)
  const [departman, setDepartman] = useState("")
  const [durum, setDurum] = useState("")
  const [dateRange, setDateRange] = useState([])
  const [selecteddownload, setselecteddownload] = useState("all")
  const [loading, setLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(false)

  const handleDownloadClick = () => {
    const startDate = dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : ""
    const endDate = dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : ""
    const params = new URLSearchParams({
      type: selecteddownload,
      start_date: startDate,
      end_date: endDate,
      departman: departman.toString(),
      durum,
    })
    window.open(import.meta.env.VITE_APP_API_URL + "/admin/download-girisler?" + params.toString(), "_blank")
  }

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1)
  }

  const [girisler, setGirisler] = useState()
  const [mudurlukler, setMudurlukler] = useState([])

  const getGirisler = async () => {
    setTableLoading(true)
    try {
      const startDate = dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : ""
      const endDate = dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : ""

      const giris = await requestWithAuth("post", "/admin/get-girisler?page=", page, "", {
        name: name,
        departman: departman.toString(),
        durum,
        start_date: startDate,
        end_date: endDate,
      })
      setGirisler(giris.data.girisler)
    } catch (error) {
      console.error("Error fetching girisler:", error)
    } finally {
      setTableLoading(false)
      setLoading(false)
    }
  }

  const getMudurlukler = async () => {
    try {
      const resp = await requestWithAuth("get", "/admin/get-mudurlukler")
      setMudurlukler(resp.data.mudurlukler)
    } catch (error) {
      console.error("Error fetching departments:", error)
    }
  }

  useEffect(() => {
    getMudurlukler()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [name, departman, durum, dateRange])

  useEffect(() => {
    getGirisler()
  }, [name, page, departman, durum, dateRange])

  const getStatusInfo = (girisZamani, cikisZamani) => {
    if (!girisZamani) {
      return {
        status: "gelmedi",
        text: "Gelmedi",
        icon: <Cancel />,
        className: "status-absent",
      }
    }

    const girisTime = new Date(`1970-01-01T${girisZamani}`)
    const workStartTime = new Date(`1970-01-01T08:00:00`)

    if (girisTime <= workStartTime) {
      return {
        status: "geldi",
        text: "Geldi",
        icon: <CheckCircle />,
        className: "status-present",
      }
    } else {
      return {
        status: "gec-geldi",
        text: "Geç Geldi",
        icon: <Warning />,
        className: "status-late",
      }
    }
  }

  // Skeleton loader for table rows
  const SkeletonRow = () => (
    <tr>
      <td>
        <Skeleton variant="text" width={30} />
      </td>
      <td>
        <div className="personel-info">
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={100} />
        </div>
      </td>
      <td>
        <Skeleton variant="rectangular" width={120} height={24} />
      </td>
      <td>
        <Skeleton variant="text" width={80} />
      </td>
      <td>
        <Skeleton variant="text" width={80} />
      </td>
      <td>
        <Skeleton variant="text" width={80} />
      </td>
      <td>
        <Skeleton variant="rectangular" width={80} height={24} />
      </td>
    </tr>
  )

  return (
    <div className="girisler-container">
      {/* Header with metrics and actions */}
      <div className="girisler-header">
        <div className="girisler-title-section">
          <h1 className="girisler-title">Personel Giriş-Çıkış Takibi</h1>
          <p className="girisler-subtitle">Personel giriş-çıkış saatlerini takip edin ve raporlayın</p>
        </div>

        <div className="header-content">
          <div className="girisler-metrics">
            <div className="metric-card-small">
              <div className="metric-icon-small">
                <Person />
              </div>
              <div className="metric-content-small">
                <div className="metric-value-small">
                  {loading ? <Skeleton width={60} /> : girisler?.pagination?.total_records || 0}
                </div>
                <div className="metric-label-small">Toplam Kayıt</div>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <Popconfirm
              title="Giriş-çıkış listesini indir"
              description={
                <Radio.Group value={selecteddownload} onChange={(e) => setselecteddownload(e.target.value)}>
                  <Radio value="all">Tüm Kayıtlar</Radio>
                  <Radio value="present">Gelenler</Radio>
                  <Radio value="late">Geç Gelenler</Radio>
                  <Radio value="absent">Gelmeyenler</Radio>
                </Radio.Group>
              }
              onConfirm={handleDownloadClick}
              okText="İndir"
              cancelText="Vazgeç"
            >
              <button className="secondary-button">
                <CloudDownload style={{ marginRight: "8px", fontSize: "1rem" }} />
                Excel İndir
              </button>
            </Popconfirm>
          </div>
        </div>
      </div>

      <div className="girisler-filters">
        <h3 className="filter-title">
          <FilterList style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Filtreleme Seçenekleri
        </h3>
        <div className="filter-row">
          <div className="filter-item">
            <FormControl fullWidth>
              <InputLabel>Müdürlük</InputLabel>
              <Select value={departman} label="Müdürlük" onChange={(e) => setDepartman(e.target.value)}>
                <MenuItem value="">Tüm Müdürlükler</MenuItem>
                {mudurlukler?.map((mudurluk) => (
                  <MenuItem value={mudurluk.id} key={mudurluk.id}>
                    {mudurluk.birim}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="filter-item">
            <TextField
              fullWidth
              label="Personel Adı"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Personel adı ara..."
            />
          </div>

          <div className="filter-item">
            <FormControl fullWidth>
              <InputLabel>Durum</InputLabel>
              <Select value={durum} label="Durum" onChange={(e) => setDurum(e.target.value)}>
                <MenuItem value="">Tüm Durumlar</MenuItem>
                <MenuItem value="geldi">Geldi</MenuItem>
                <MenuItem value="gec-geldi">Geç Geldi</MenuItem>
                <MenuItem value="gelmedi">Gelmedi</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="filter-item">
            <RangePicker
              style={{ width: "100%", height: "56px" }}
              placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]}
              value={dateRange}
              onChange={setDateRange}
              format="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table-girisler">
          <thead>
            <tr>
              <th>#</th>
              <th>Personel Bilgileri</th>
              <th>Bölüm</th>
              <th>Tarih</th>
              <th>Giriş Saati</th>
              <th>Çıkış Saati</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {tableLoading
              ? Array.from({ length: 10 }).map((_, index) => <SkeletonRow key={index} />)
              : girisler?.result?.length > 0 &&
                girisler.result.map((giris, index) => {
                  const statusInfo = getStatusInfo(giris.giris_zamani, giris.cikis_zamani)

                  return (
                    <tr key={`${giris.personel_id}-${giris.tarih}`} className="table-row-hover">
                      <td>
                        <span className="row-number">{index + 1 + (page - 1) * 50}</span>
                      </td>
                      <td>
                        <div className="personel-info">
                          <div className="personel-name">
                            {giris.personel?.Adi} {giris.personel?.Soyadi}
                          </div>
                          <div className="personel-title">{giris.personel?.Unvani}</div>
                        </div>
                      </td>
                      <td>
                        {giris.personel?.department?.birim && (
                          <div className="department-badge">{giris.personel.department.birim}</div>
                        )}
                      </td>
                      <td>
                        <div className="date-display">{formatDate(giris.tarih)}</div>
                      </td>
                      <td>
                        <div className="time-display">
                          {giris.giris_zamani ? (
                            <>
                              <AccessTime fontSize="small" />
                              {formatTime(giris.giris_zamani)}
                            </>
                          ) : (
                            "-"
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="time-display">
                          {giris.cikis_zamani ? (
                            <>
                              <AccessTime fontSize="small" />
                              {formatTime(giris.cikis_zamani)}
                            </>
                          ) : (
                            "-"
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={`status-badge ${statusInfo.className}`}>
                          {statusInfo.icon}
                          <span>{statusInfo.text}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>

        {!tableLoading && girisler?.result?.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">⏰</div>
            <div className="empty-state-title">Giriş-çıkış kaydı bulunamadı</div>
            <div className="empty-state-description">
              Seçilen kriterlere uygun giriş-çıkış kaydı bulunamadı. Filtreleri değiştirmeyi deneyin.
            </div>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-3 mb-3">
        <ReactPaginate
          previousLabel={<NavigateBefore />}
          nextLabel={<NavigateNext />}
          breakLabel={"..."}
          pageCount={girisler?.pagination?.total_page || 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  )
}

export default Girisler
