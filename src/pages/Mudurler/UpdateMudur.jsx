import { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { successToast } from "../../helpers/toast";

const dummyDepartments = [
  "Zabıta",
  "Fen İşleri",
  "İmar",
  "Bilgi İşlem",
  "Temizlik",
];

function UpdateMudur({ open, handleClose, mudur, onUpdateMudur }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    username: "",
    department: "",
    zkdDepartmentCode: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (mudur) {
      setForm({
        id: mudur.id,
        name: mudur.name,
        username: mudur.username,
        department: mudur.department,
        zkdDepartmentCode: mudur.zkdDepartmentCode || "",
        password: "",
      });
    }
  }, [mudur]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...form };
    if (!form.password) delete dataToSend.password;
    onUpdateMudur(dataToSend);
    successToast("Müdür bilgileri güncellendi.");
    handleClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <div className="p-4">
        <Typography variant="h6" className="mb-3">
          Müdür Güncelle
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Ad Soyad"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Kullanıcı Adı"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Yeni Şifre"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              fullWidth
              placeholder="Boş bırakırsanız değişmez"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Müdürlük"
              name="department"
              select
              value={form.department}
              onChange={handleChange}
              fullWidth
            >
              {dummyDepartments.map((dep, i) => (
                <MenuItem key={i} value={dep}>
                  {dep}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="ZKT Departman Kodu"
              name="zkdDepartmentCode"
              value={form.zkdDepartmentCode}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: "1.5rem" }}
          >
            Güncelle
          </Button>
        </form>
      </div>
    </Dialog>
  );
}

export default UpdateMudur;
