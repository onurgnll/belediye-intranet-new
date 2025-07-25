"use client";

import { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import CreateMudur from "./CreateMudur";
import UpdateMudur from "./UpdateMudur";
import { successToast } from "../../helpers/toast";

export default function Mudurs() {
  const [mudurs, setMudurs] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editMudur, setEditMudur] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        name: "Ahmet Yılmaz",
        username: "ahmety",
        department: "Zabıta",
        zkdDepartmentCode: "ZBT001",
      },
      {
        id: 2,
        name: "Zeynep Demir",
        username: "zeynepd",
        department: "Fen İşleri",
        zkdDepartmentCode: "FEN002",
      },
    ];
    setMudurs(dummy);
  }, []);

  const handleAddMudur = (yeniMudur) => {
    setMudurs((prev) => [
      ...prev,
      { ...yeniMudur, id: prev.length + 1 },
    ]);
  };

  const handleDelete = (id) => {
    const confirmm = confirm("Silmek istiyor musunuz?");
    if (!confirmm) return;
    setMudurs((prev) => prev.filter((m) => m.id !== id));
    successToast("Müdür başarıyla silindi.");
  };

  const handleUpdate = (updated) => {
    setMudurs((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
    successToast("Müdür bilgileri güncellendi.");
  };

  const filtered = mudurs.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <CreateMudur
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        onAddMudur={handleAddMudur}
      />
      <UpdateMudur
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        mudur={editMudur}
        onUpdateMudur={handleUpdate}
      />

      <div className="d-flex justify-content-between align-items-center">
        <TextField
          className="mt-2"
          id="search"
          label="Ad Soyad"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setOpenCreate(true)} className="olusturbutton px-5 mt-2">
          Oluştur
        </button>
      </div>

      <hr />

      <table className="custom-table1">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Kullanıcı Adı</th>
            <th>Müdürlük</th>
            <th>ZKT Departman Kodu</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                Kayıt bulunamadı.
              </td>
            </tr>
          ) : (
            filtered.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.username}</td>
                <td>{m.department}</td>
                <td>{m.zkdDepartmentCode}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button
                      className="olusturbutton"
                      style={{
                        padding: "6px 16px",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        setEditMudur(m);
                        setOpenEdit(true);
                      }}
                    >
                      Güncelle
                    </button>
                    <IconButton onClick={() => handleDelete(m.id)} size="small">
                      <Delete style={{ color: "crimson" }} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
