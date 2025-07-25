"use client"

import { useState } from "react"
import "./login.css"
import logo from "../../assets/200180283.png"
import { Button, TextField } from "@mui/material"
import { requestWithoutAuth } from "../../helpers/requests"
import { useDispatch } from "react-redux"
import { setLoggedAdmin, setLoggedStatus } from "../../redux/features/authSlice"
import { errorToast, successToast } from "../../helpers/toast"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault() // Enter tuşuna basıldığında formun yenilenmesini engeller

    const resp = await requestWithoutAuth("post", "/admin/login", "", "", { username, password })

    if (resp.success == 1) {
      localStorage.setItem("token", resp.data.token.accessToken)
      dispatch(setLoggedStatus(true))
      successToast("Başarıyla Giriş Yapıldı")
      dispatch(setLoggedAdmin(resp.data.user))
    } else {
      errorToast(resp.message)
    }
  }

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className="asdasdas d-flex flex-column justify-content-center align-items-center"
    >
      <div className="login-container d-flex flex-column align-items-center">
        <img
          className="login-logo"
          style={{ height: "200px", width: "200px", marginBottom: "2rem" }}
          src={logo || "/placeholder.svg"}
          alt=""
        />
        <form
          onSubmit={handleLogin}
          className="d-flex flex-column w-100 align-items-center"
          style={{ minWidth: "300px" }}
        >
          <TextField
            size="small"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              "& .MuiFilledInput-root": {
                borderRadius: "12px",
              },
            }}
            variant="filled"
            className="mb-3 w-100"
            label="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            size="small"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              "& .MuiFilledInput-root": {
                borderRadius: "12px",
              },
            }}
            variant="filled"
            label="Şifre"
            className="w-100 mb-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              padding: "12px 0",
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #115293, #1976d2)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              },
            }}
            className="w-100"
            variant="contained"
            type="submit"
          >
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
