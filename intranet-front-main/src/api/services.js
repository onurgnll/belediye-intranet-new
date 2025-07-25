import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

const api = axios.create({
  baseURL: API_URL,
})

export const getInternalNumbers = (page = 1, filters = {}) => {
  return axios.post(`${API_URL}/user/get-phone-numbers?page=${page}`, filters)
}

export const getDuyurular = () => api.get("/user/get-duyuru")

export const getBirthdays = () => axios.get(`${API_URL}/user/get-birthday-persons`)

export const getAnketler = () => api.get("/user/get-anketler")

export const getAnketById = (id) => axios.get(`${API_URL}/user/get-anket/${id}`)

export const replyAnket = (payload) => axios.post(`${API_URL}/user/reply-anket`, payload)

export const getWhoAmI = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/whoami`)
    return response.data
  } catch (err) {
    console.error("IP alınamadı:", err)
    return { ip: "Bilinmiyor" }
  }
}

// New: Manager Login
export const loginManager = (username, password) => {
  return axios.post(`${API_URL}/mudur/login`, { username, password })
}

// New: Get Personnel Attendance
export const getPersonnelAttendance = (date, token) => {
  return axios.post(
    `${API_URL}/mudur/kartbasim`,
    { date },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
