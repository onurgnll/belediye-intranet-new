import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/200180283.png";
import { Button, TextField } from "@mui/material";
import { requestWithAuth, requestWithoutAuth } from "../../helpers/requests";
import { useDispatch } from "react-redux";
import { setLoggedAdmin, setLoggedStatus } from "../../redux/features/authSlice";
import { errorToast, successToast } from "../../helpers/toast";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const handleLogin = async() => {


        const resp = await requestWithoutAuth("post" , "/admin/login" , "" , "" , {username , password})

        if(resp.success == 1) {
            localStorage.setItem("token" , resp.data.token.accessToken)
            dispatch(setLoggedStatus(true))
            successToast("Başarıyla Giriş Yapıldı")
            dispatch(setLoggedAdmin(resp.data.user))
        }else{
            errorToast(resp.message)
        }


    };

    return (
        <div style={{ height: "100vh", width: "100%" }} className="asdasdas d-flex flex-column justify-content-center align-items-center">
            <img style={{ height: "250px", width: "250px" }} src={logo} alt="" />
            <div className="d-flex flex-column w-25 mt-5 align-items-center">
                <TextField 
                    size="small" 
                    sx={{ backgroundColor: "white", borderRadius: "10px" }} 
                    variant="filled" 
                    className="mb-2 w-100" 
                    label="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField 
                    size="small" 
                    sx={{ backgroundColor: "white", borderRadius: "10px" }} 
                    variant="filled"  
                    label="Şifre" 
                    className="w-100"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    sx={{ borderRadius: "15px", backgroundColor: "#E6453A" }} 
                    className="mt-3 w-75" 
                    variant="contained"
                    onClick={handleLogin}
                >
                    Giriş Yap
                </Button>
            </div>
        </div>
    );
}

export default LoginPage;
