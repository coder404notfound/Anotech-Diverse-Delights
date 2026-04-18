import { create } from "zustand"

const getInitialAuth = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true"
  const user = JSON.parse(localStorage.getItem("user"))

  return {
    isAuthenticated,
    user
  }
}

export const useAuthStore = create((set) => ({
  ...getInitialAuth(),

  login: (email) => {
    const user = { email }

    localStorage.setItem("auth", "true")
    localStorage.setItem("user", JSON.stringify(user))

    set({ isAuthenticated: true, user })
  },

  logout: () => {
    localStorage.removeItem("auth")
    localStorage.removeItem("user")

    set({ isAuthenticated: false, user: null })
  }
}))