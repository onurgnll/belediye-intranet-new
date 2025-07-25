const TOKEN_KEY = "manager_access_token"

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const isLoggedIn = () => {
  return !!getAuthToken()
}
