import { createAsyncThunk } from "@reduxjs/toolkit";


const ApiEndpoint = `${import.meta.env.VITE_APP_API_URL}`
export const login = createAsyncThunk('login', async (body) => {
  try {
    const response = await fetch(`${ApiEndpoint}/municipality/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    if(json.success == 1){
      localStorage.setItem("token", json.data.token.accessToken)
      
    }
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
});



export const register = createAsyncThunk('register', async (body) => {
  try {
    const response = await fetch(`${ApiEndpoint}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
});





export const loginUser = createAsyncThunk('loginUser', async (body ) => {
  try {
    const response = await fetch(`${ApiEndpoint}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    if(json.success == 1){
      console.log(json);
      localStorage.setItem("token", json.data.token)
    }
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
});



export const registerUser = createAsyncThunk('register', async (body) => {
  try {
    const response = await fetch(`${ApiEndpoint}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
