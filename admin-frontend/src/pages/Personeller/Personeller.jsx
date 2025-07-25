"use client"

import { useEffect, useState } from "react"
import { requestWithAuth } from "../../helpers/requests"
import { FormControl, InputLabel, MenuItem, Select, TextField, Skeleton } from "@mui/material"
import ReactPaginate from "react-paginate"
import "./personels.css"
import {
  CloudDownload,
  Delete,
  NavigateBefore,
  NavigateNext,
  Phone,
  Person,
  FilterList,
  PersonAdd,
} from "@mui/icons-material"
import EditPersonel from "./EditPersonel"
import CreatePersonel from "./CreatePersonel"
import { Popconfirm, Radio } from "antd"
import { errorToast } from "../../helpers/toast"

function Personeller() {
  const [name, setName] = useState("")
  const [page, setPage] = useState(1)
  const [departman, setDepartman] = useState("")
  const [kartno, setKartno] = useState("")
  const [unvan, setUnvan] = useState("")
  const [cinsiyet, setCinsiyet] = useState("")
  const [aktif, setAktif] = useState("")
  const [selecteddownload, setselecteddownload] = useState(1)
  const [loading, setLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(false)

  const handleDownloadClick = () => {
    if (!selecteddownload) {
      errorToast("Aktif veya pasif'i seçin")
    }
    window.open(import.meta.env.VITE_APP_API_URL + "/admin/download-personeller/" + selecteddownload, "_blank")
  }

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1)
  }

  const [personeller, setPersoneller] = useState()
  const [mudurlukler, setMudurlukler] = useState([])
  const [selectedPersonel, setSelectedPersonel] = useState(null)
  const [open2, setOpen2] = useState(false)
  const [open, setOpen] = useState(false)

  const getPersonels = async () => {
    setTableLoading(true)
    try {
      const personel = await requestWithAuth("post", "/admin/get-personels?page=", page, "", {
        name: name,
        departman: departman.toString(),
        kartno,
        unvan,
        cinsiyet,
        aktiflik: aktif,
      })
      setPersoneller(personel.data.personels)
    } catch (error) {
      console.error("Error fetching personels:", error)
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
  }, [name])

  useEffect(() => {
    getPersonels()
  }, [name, page, departman, kartno, unvan, cinsiyet, aktif])

  const handleClickOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = async (id) => {
    var confi = confirm("Bu personeli silmek istiyormusunuz?")
    if (confi) {
      await requestWithAuth("delete", "/admin/delete-personel/", id)
      getPersonels()
    }
  }

  // Skeleton loader for table rows
  const SkeletonRow = () => (
    <tr>
      <td>
        <Skeleton variant="text" width={30} />
      </td>
      <td>
        <Skeleton variant="rectangular" width={80} height={100} />
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
        <Skeleton variant="rectangular" width={80} height={32} />
      </td>
      <td>
        <Skeleton variant="rectangular" width={100} height={24} />
      </td>
      <td>
        <Skeleton variant="text" width={120} />
      </td>
      <td>
        <Skeleton variant="circular" width={24} height={24} />
      </td>
    </tr>
  )

  return (
    <div className="personel-container">
      <EditPersonel
        getPersonels={getPersonels}
        page={page}
        open={open2}
        handleClose={handleClose2}
        personel={selectedPersonel}
      />
      <CreatePersonel getPersonels={getPersonels} page={page} open={open} handleClose={handleClose} />

      {/* Header with metrics and actions */}
      <div className="personel-header">
        <div className="personel-title-section">
          <h1 className="personel-title">Personel Yönetimi</h1>
          <p className="personel-subtitle">Belediye personellerini yönetin ve düzenleyin</p>
        </div>

        <div className="header-content">
          <div className="personel-metrics">
            <div className="metric-card-small">
              <div className="metric-icon-small">
                <Person />
              </div>
              <div className="metric-content-small">
                <div className="metric-value-small">
                  {loading ? <Skeleton width={60} /> : personeller?.pagination?.total_records || 0}
                </div>
                <div className="metric-label-small">Toplam Personel</div>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <Popconfirm
              title="Personel listesini indir"
              description={
                <Radio.Group value={selecteddownload} onChange={(e) => setselecteddownload(e.target.value)}>
                  <Radio value={1}>Aktif Personeller</Radio>
                  <Radio value={-1}>Pasif Personeller</Radio>
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

            <button onClick={handleClickOpen} className="olusturbutton">
              <PersonAdd style={{ marginRight: "8px", fontSize: "1rem" }} />
              Yeni Personel Ekle
            </button>
          </div>
        </div>
      </div>

      <div className="personel-filters">
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
            <TextField
              fullWidth
              label="Kart Numarası"
              variant="outlined"
              value={kartno}
              onChange={(e) => setKartno(e.target.value)}
              placeholder="Kart numarası ara..."
            />
          </div>

          <div className="filter-item">
            <TextField
              fullWidth
              label="Görev Unvanı"
              variant="outlined"
              value={unvan}
              onChange={(e) => setUnvan(e.target.value)}
              placeholder="Görev unvanı ara..."
            />
          </div>

          <div className="filter-item">
            <FormControl fullWidth>
              <InputLabel>Cinsiyet</InputLabel>
              <Select value={cinsiyet} label="Cinsiyet" onChange={(e) => setCinsiyet(e.target.value)}>
                <MenuItem value="">Tüm Cinsiyetler</MenuItem>
                <MenuItem value="0">Belirtilmemiş</MenuItem>
                <MenuItem value="1">Erkek</MenuItem>
                <MenuItem value="-1">Kadın</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="filter-item">
            <FormControl fullWidth>
              <InputLabel>Durum</InputLabel>
              <Select value={aktif} label="Durum" onChange={(e) => setAktif(e.target.value)}>
                <MenuItem value="">Tüm Durumlar</MenuItem>
                <MenuItem value="1">Aktif</MenuItem>
                <MenuItem value="-1">Pasif</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table5">
          <thead>
            <tr>
              <th>#</th>
              <th>Fotoğraf</th>
              <th>Personel Bilgileri</th>
              <th>Bölüm</th>
              <th>Kart No</th>
              <th>Öğrenim</th>
              <th>İletişim</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {tableLoading
              ? Array.from({ length: 10 }).map((_, index) => <SkeletonRow key={index} />)
              : personeller?.result?.length > 0 &&
                personeller.result.map((personel, index) => (
                  <tr
                    key={personel.ID}
                    onClick={() => {
                      setSelectedPersonel(personel)
                      setOpen2(true)
                    }}
                    className="table-row-hover"
                  >
                    <td>
                      <span className="row-number">{index + 1 + page * 50 - 50}</span>
                    </td>
                    <td>
                      <img
                        className="personel-avatar"
                        src={`${import.meta.env.VITE_APP_URL}/kullanici/${personel.Resim}`}
                        alt={`${personel.Adi} ${personel.Soyadi}`}
                        loading="lazy"
                      />
                    </td>
                    <td>
                      <div className="personel-info">
                        <div className="personel-name">
                          {personel.Adi} {personel.Soyadi}
                        </div>
                        <div className="personel-title2">{personel.Unvani}</div>
                      </div>
                    </td>
                    <td>
                      {personel.department?.birim && (
                        <div className="department-badge">{personel.department.birim}</div>
                      )}
                    </td>
                    <td>
                      <div className="card-number">{personel.KartNo}</div>
                    </td>
                    <td>{personel?.ogrenim?.Adi && <div className="education-level">{personel.ogrenim.Adi}</div>}</td>
                    <td>
                      {personel.TelefonNo && (
                        <div className="phone-number">
                          <Phone fontSize="small" />
                          {personel.TelefonNo}
                        </div>
                      )}
                    </td>
                    <td>
                      <Delete
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(personel.ID)
                        }}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {!tableLoading && personeller?.result?.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <div className="empty-state-title">Personel bulunamadı</div>
            <div className="empty-state-description">
              Arama kriterlerinize uygun personel bulunamadı. Filtreleri değiştirmeyi deneyin.
            </div>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-3 mb-3">
        <ReactPaginate
          previousLabel={<NavigateBefore />}
          nextLabel={<NavigateNext />}
          breakLabel={"..."}
          pageCount={personeller?.pagination?.total_page || 1}
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

export default Personeller
