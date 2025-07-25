import {  createSlice } from '@reduxjs/toolkit'
import { login, loginUser } from '../actions/authActions';

const initialState = {
  logged: false,
  userId: null,
  accessToken: null,
  loggedAdmin: null,


  notifications: [],

  notificationCount: 0,

  loggedUser: false,
  openLoginDialog: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedStatus: (state, action) => {
      state.logged = action.payload;
    },
    setLoggedAdmin: (state, action) => {
      state.loggedAdmin = action.payload;
    },
    logout: (state, action) => {
      state.logged = false;
      state.loggedUser= false
      localStorage.removeItem("token")
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;

      for (const iterator of action.payload) {
        if(iterator.seen != true) {
          state.notificationCount += 1
        }
      }
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload
    },
    setLoginDialogState: (state, action) => {
      state.openLoginDialog = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.success == 1) {
          state.logged = true
          state.loggedUser = action.payload.data.municipality
          
        }
      })
  },

});

export const {setLoggedStatus ,logout, setLoggedAdmin,setLoginDialogState , setNotifications,setNotificationCount } = authSlice.actions

export default authSlice.reducer;
