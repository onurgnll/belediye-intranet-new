import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CreateMudur({ open, handleClose, onAddMudur }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    department: "",
    zkdDepartmentCode: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const dummyDepartments = [
    "Zabıta",
    "Fen İşleri",
    "İmar",
    "Bilgi İşlem",
    "Temizlik",
  ];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMudur(form);
    handleClose();
    setForm({
      name: "",
      username: "",
      password: "",
      department: "",
      zkdDepartmentCode: "",
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Yeni Müdür Oluştur</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
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
              label="Şifre"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              fullWidth
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button type="submit" variant="contained">
            Oluştur
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
