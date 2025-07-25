"use client"

import { useEffect, useState } from "react"
import { requestWithAuth, requestWithAuthForm } from "../../helpers/requests"
import { CloudDownload, CloudUpload, Delete, NavigateBefore, NavigateNext } from "@mui/icons-material"
import { TextField } from "@mui/material"
import CreateClients from "./CreateClients"
import "./Clients.css"
import ReactPaginate from "react-paginate"
import UpdateClient from "./UpdateClient"
import { errorToast, successToast } from "../../helpers/toast"

function Clients() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [search, setSearch] = useState("")
  const [ip, setIP] = useState("")
  const [page, setPage] = useState(1)
  const [clients, setClients] = useState()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [updatingClient, setUpdatingClient] = useState()

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1)
  }

  useEffect(() => {
    setPage(1)
  }, [search, ip])

  const getClients = async () => {
    const resp = await requestWithAuth("post", "/admin/get-clients?page=", page, "", {
      name: search,
      ip,
    })
    setClients(resp.data.clients)
  }

  useEffect(() => {
    getClients(page)
  }, [search, ip, page])

  const handleDelete = async (id) => {
    var confi = confirm("Bu IP'yi silmek istiyormusunuz?")
    if (confi) {
      await requestWithAuth("delete", "/admin/delete-client/", id)
      getClients()
    }
  }

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleClickOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  const handleDownloadClick = () => {
    window.open(import.meta.env.VITE_APP_API_URL + "/admin/download-clients", "_blank")
  }

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
      const res = await requestWithAuthForm("post", "/admin/upload-excel-for-ips", "", "", formData)
      if (res.success == 1) {
        setPage(1)
        getClients(page)
        successToast("IP'ler Güncellendi")
        setSelectedFile(null)
      } else {
        errorToast("Bir hata oluştu.")
      }
    } catch (error) {
      console.error("Dosya yükleme hatası:", error)
      alert("Dosya yükleme sırasında bir hata oluştu.")
    }
  }

  return (
    <div className="clients-container">
      <UpdateClient
        client={updatingClient}
        open={open2}
        handleClose={handleClose2}
        getClients={getClients}
        setPage={setPage}
      />
      <CreateClients setPage={setPage} getClients={getClients} open={open} handleClose={handleClose} />

      <div className="clients-filters">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3">
            <TextField
              label="İsim Ara"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ minWidth: "200px" }}
            />
            <TextField
              label="IP Ara"
              variant="outlined"
              value={ip}
              onChange={(e) => setIP(e.target.value)}
              style={{ minWidth: "200px" }}
            />
          </div>

          <div className="clients-actions">
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
              Yeni IP
            </button>
          </div>
        </div>
      </div>

      <table className="custom-table1">
        <thead>
          <tr>
            <th>Kullanıcı Bilgileri</th>
            <th>IP Adresi</th>
            <th>MAC Adresi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {clients?.result?.length > 0 &&
            clients.result.map((client) => (
              <tr
                key={client.id}
                className="ip-row"
                onClick={() => {
                  setUpdatingClient(client)
                  handleClickOpen2()
                }}
              >
                <td>
                  <div className="client-info">
                    <div className="client-name">{client.name}</div>
                  </div>
                </td>
                <td>
                  <div className="ip-address">{client.ip}</div>
                </td>
                <td>
                  <div className="mac-address">{client.address}</div>
                </td>
                <td>
                  <Delete
                    className="delete-client-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(client.id)
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
          pageCount={clients?.pagination?.total_page || 1}
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

export default Clients
