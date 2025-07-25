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
    <div className="login-page-wrapper">
      <div className="login-container">
        <img className="login-logo" src={logo || "/placeholder.svg"} alt="Belediye Logo" />
        <h1 className="login-title">Yönetim Paneli</h1>
        <p className="login-subtitle">Lütfen devam etmek için giriş yapın.</p>
        <form onSubmit={handleLogin} className="login-form">
          <TextField
            fullWidth
            variant="outlined"
            label="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="login-button" fullWidth variant="contained" type="submit">
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
