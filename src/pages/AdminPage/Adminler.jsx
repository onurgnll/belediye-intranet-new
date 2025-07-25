"use client"

import { useEffect, useState } from "react"
import { requestWithAuth } from "../../helpers/requests"
import { Checkbox, TextField } from "@mui/material"
import { errorToast, successToast } from "../../helpers/toast"
import CreateAdmin from "./CreateAdmin"
import { Delete, Edit } from "@mui/icons-material"
import "./Adminler.css"

function Adminler() {
  const [admins, setAdmins] = useState([])
  const [search, setSearch] = useState("")

  const getAdmin = async () => {
    const response = await requestWithAuth("post", "/admin/get-admins", "", "", { name: search })
    setAdmins(response.data.admins)
  }

  const updateAdmin = async (admin) => {
    const updatedAdmin = {
      user_id: admin.user_id,
      password: admin.password,
      allowDuyuru: admin.allowDuyuru,
      allowPhones: admin.allowPhones,
      allowIPS: admin.allowIPS,
      allowPersonel: admin.allowPersonel,
      allowAnket: admin.allowAnket,
      allowMudurlukler: admin.allowMudurlukler,
      allowAdmins: admin.allowAdmins,
    }

    const response = await requestWithAuth("post", "/admin/update-admin", "", "", updatedAdmin)

    if (response.success == 1) {
      successToast("Admin Başarıyla Güncellendi.")
      getAdmin()
    } else {
      errorToast("Admin güncellenirken bir hata oluştu.")
    }
  }

  const handleCheckboxChange = (adminIndex, field, value) => {
    const updatedAdmins = [...admins]
    updatedAdmins[adminIndex][field] = value ? 1 : 0
    setAdmins(updatedAdmins)
  }

  const handlePasswordChange = (adminIndex, newPassword) => {
    const updatedAdmins = [...admins]
    updatedAdmins[adminIndex].password = newPassword
    setAdmins(updatedAdmins)
  }

  useEffect(() => {
    getAdmin()
  }, [])

  useEffect(() => {
    getAdmin()
  }, [search])

  const [open, setOpen] = useState(false)

  const handleClickOpen = (e) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteAdmin = async (userId) => {
    const confirmm = confirm("Silmek İstiyor musunuz?")

    if (!confirmm) return

    const response = await requestWithAuth("delete", `/admin/delete-admin/${userId}`)

    if (response.success == 1) {
      successToast("Admin Başarıyla Silindi.")
      getAdmin()
    } else {
      errorToast("Admin silinirken bir hata oluştu.")
    }
  }

  return (
    <div>
      <CreateAdmin getAdmin={getAdmin} open={open} handleClose={handleClose}></CreateAdmin>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <TextField
            className="mt-2"
            id="title"
            label="Kullanıcı Adı"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <button onClick={handleClickOpen} className="olusturbutton px-5">
            Oluştur
          </button>
        </div>
      </div>
      <hr />

      <div className="table-container">
        <table className="custom-table1">
          <thead>
            <tr>
              <th>Kullanıcı Adı</th>
              <th>Şifre</th>
              <th>Duyuru</th>
              <th>Telefonlar</th>
              <th>IP'ler</th>
              <th>Personeller</th>
              <th>Anketler</th>
              <th>Müdürlükler</th>
              <th>Adminler</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {admins &&
              admins.map((admin, index) => {
                return (
                  <tr key={admin.user_id}>
                    <td>{admin.username}</td>
                    <td>
                      <TextField
                        value={admin.password || ""}
                        type="password"
                        size="small"
                        onChange={(e) => handlePasswordChange(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={admin.allowDuyuru === 1}
                        onChange={(e) => handleCheckboxChange(index, "allowDuyuru", e.target.checked)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={admin.allowPhones === 1}
                        onChange={(e) => handleCheckboxChange(index, "allowPhones", e.target.checked)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={admin.allowIPS === 1}
                        onChange={(e) => handleCheckboxChange(index, "allowIPS", e.target.checked)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={admin.allowPersonel === 1}
                        onChange={(e) => handleCheckboxChange(index, "allowPersonel", e.target.checked)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={admin.allowAnket === 1}
                        onChange={(e) => handleCheckboxChange(index, "allowAnket", e.target.checked)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={admin.allowMudurlukler === 1}
                        onChange={(e) => handleCheckboxChange(index, "allowMudurlukler", e.target.checked)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={admin.allowAdmins === 1}
                        onChange={(e) => handleCheckboxChange(index, "allowAdmins", e.target.checked)}
                      />
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="action-button edit" onClick={() => updateAdmin(admin)} title="Güncelle">
                          <Edit fontSize="small" />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteAdmin(admin.user_id)
                          }}
                          title="Sil"
                        >
                          <Delete fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Adminler
