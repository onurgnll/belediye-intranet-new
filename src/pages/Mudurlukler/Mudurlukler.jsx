"use client"

import { useEffect, useState } from "react"
import "./mudurlukler.css"
import { requestWithAuth } from "../../helpers/requests"
import { Delete } from "@mui/icons-material"
import CreateMudurluk from "./CreateMudurluk"
import UpdateMudurluk from "./UpdateMudurluk"

function Mudurlukler() {
  const [mudurlukler, setMudurlukler] = useState([])
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [updatingMudurluk, setUpdatingMudurluk] = useState()

  const getMudurlukler = async () => {
    const resp = await requestWithAuth("get", "/admin/get-mudurlukler")
    setMudurlukler(resp.data.mudurlukler)
  }

  useEffect(() => {
    getMudurlukler()
  }, [])

  const handleDelete = async (id) => {
    var confi = confirm("Bu müdürlüğü silmek istiyormusunuz?")
    if (confi) {
      await requestWithAuth("delete", "/admin/delete-mudurluk/", id)
      getMudurlukler()
    }
  }

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleClickOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  return (
    <div className="mudurlukler-container">
      <CreateMudurluk open={open} handleClose={handleClose} getMudurlukler={getMudurlukler} />
      <UpdateMudurluk
        open={open2}
        handleClose={handleClose2}
        getMudurlukler={getMudurlukler}
        mudurluk={updatingMudurluk}
      />

      <div className="mudurluk-actions">
        <button onClick={handleClickOpen} className="olusturbutton">
          Yeni Müdürlük
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Müdürlük Adı</th>
            <th>Müdür</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {mudurlukler?.length > 0 &&
            mudurlukler.map((mudurluk) => (
              <tr
                key={mudurluk.id}
                className="mudurluk-row"
                onClick={() => {
                  handleClickOpen2()
                  setUpdatingMudurluk(mudurluk)
                }}
              >
                <td>
                  <div className="mudurluk-info">
                    <div className="mudurluk-name">{mudurluk?.birim}</div>
                  </div>
                </td>
                <td>
                  <div className="mudur-info">
                    <div className="mudur-avatar">
                      {mudurluk?.mudurr?.Adi?.charAt(0)}
                      {mudurluk?.mudurr?.Soyadi?.charAt(0)}
                    </div>
                    <div className="mudur-name">
                      {mudurluk?.mudurr?.Adi} {mudurluk?.mudurr?.Soyadi}
                    </div>
                  </div>
                </td>
                <td>
                  <Delete
                    className="delete-mudurluk-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(mudurluk.id)
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Mudurlukler
