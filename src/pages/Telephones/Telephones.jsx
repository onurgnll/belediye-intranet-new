"use client"

import { useEffect, useState } from "react"
import { requestWithAuth, requestWithAuthForm } from "../../helpers/requests"
import { CloudDownload, CloudUpload, Delete, NavigateBefore, NavigateNext, Phone } from "@mui/icons-material"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import CreatePhoneNumber from "./CreatePhoneNumber"
import "./telephones.css"
import ReactPaginate from "react-paginate"
import UpdatePhoneNumber from "./UpdatePhoneNumber"
import { errorToast, successToast } from "../../helpers/toast"

function Telephones() {
  const [search, setSearch] = useState("")
  const [phone, setPhone] = useState("")
  const [phones, setPhones] = useState([])
  const [departman, setDepartman] = useState("")
  const [page, setPage] = useState(1)
  const [selectedFile, setSelectedFile] = useState(null)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [updatingPhone, setupdatingPhone] = useState(null)
  const [mudurlukler, setMudurlukler] = useState([])

  useEffect(() => {
    setPage(1)
  }, [search, phone, departman])

  const getPhones = async () => {
    const resp = await requestWithAuth("post", "/admin/get-phonenumber?page=", page, "", {
      name: search,
      departman,
      phone,
    })
    setPhones(resp.data.telephones)
  }

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1)
  }

  useEffect(() => {
    getPhones(page)
  }, [search, departman, phone, page])

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bu telefonu silmek istiyor musunuz?")
    if (confirmDelete) {
      await requestWithAuth("delete", "/admin/delete-phonenumber/", id)
      getPhones()
    }
  }

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleClickOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Lütfen bir dosya seçin.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const res = await requestWithAuthForm("post", "/admin/upload-excel", "", "", formData)
      if (res.success == 1) {
        setPage(1)
        getPhones(page)
        successToast("Telefonlar listesi güncellendi")
        setSelectedFile(null)
      } else {
        errorToast("Bir hata oluştu.")
      }
    } catch (error) {
      console.error("Dosya yükleme hatası:", error)
      alert("Dosya yükleme sırasında bir hata oluştu.")
    }
  }

  const handleDownloadClick = () => {
    window.open(import.meta.env.VITE_APP_API_URL + "/admin/download-telefon", "_blank")
  }

  const getMudurlukler = async () => {
    const resp = await requestWithAuth("get", "/admin/get-mudurlukler")
    setMudurlukler(resp.data.mudurlukler)
  }

  useEffect(() => {
    getMudurlukler()
  }, [])

  return (
    <div className="telephone-container">
      <UpdatePhoneNumber
        phoneNumber={updatingPhone}
        setPage={setPage}
        mudurlukler={mudurlukler}
        getPhones={getPhones}
        page={page}
        open={open2}
        handleClose={handleClose2}
      />
      <CreatePhoneNumber
        setPage={setPage}
        mudurlukler={mudurlukler}
        getPhones={getPhones}
        page={page}
        open={open}
        handleClose={handleClose}
      />

      <div className="telephone-filters">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 flex-wrap">
            <div style={{ minWidth: "200px" }}>
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

            <TextField
              label="İsim Ara"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ minWidth: "200px" }}
            />

            <TextField
              label="Telefon Ara"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ minWidth: "200px" }}
            />
          </div>

          <div className="telephone-actions">
            <div className="download-area" onClick={handleDownloadClick}>
              <CloudDownload />
              <span>İndir</span>
            </div>

            <div className="upload-area">
              {!selectedFile ? (
                <>
                  <label
                    htmlFor="file-upload"
                    style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <CloudUpload />
                    <span>Yükle</span>
                  </label>
                  <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileSelect} />
                </>
              ) : (
                <button className="upload-button" onClick={handleUpload}>
                  {selectedFile.name.length > 15 ? selectedFile.name.substring(0, 15) + "..." : selectedFile.name}{" "}
                  (Yükle)
                </button>
              )}
            </div>

            <button onClick={handleClickOpen} className="olusturbutton">
              Yeni Telefon
            </button>
          </div>
        </div>
      </div>

      <table className="custom-table1">
        <thead>
          <tr>
            <th>Personel Bilgileri</th>
            <th>Müdürlük</th>
            <th>Telefon Numarası</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {phones?.result?.length > 0 &&
            phones.result.map((phoneItem) => (
              <tr
                key={phoneItem.id}
                className="phone-row"
                onClick={() => {
                  handleClickOpen2()
                  setupdatingPhone(phoneItem)
                }}
              >
                <td>
                  <div className="phone-info">
                    <div className="phone-name">{phoneItem.name}</div>
                    {phoneItem.description && <div className="phone-description">{phoneItem.description}</div>}
                  </div>
                </td>
                <td>
                  {phoneItem?.department?.birim && <div className="department-tag">{phoneItem.department.birim}</div>}
                </td>
                <td>
                  <div className="phone-number-display">
                    <Phone />
                    {phoneItem.phone}
                  </div>
                </td>
                <td>
                  <Delete
                    className="delete-phone-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(phoneItem.id)
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-4">
        <ReactPaginate
          previousLabel={<NavigateBefore />}
          nextLabel={<NavigateNext />}
          breakLabel={"..."}
          pageCount={phones?.pagination?.total_page || 1}
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
        />
      </div>
    </div>
  )
}

export default Telephones
