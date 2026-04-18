import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast" // ✅ ADD

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const login = useAuthStore((s) => s.login)
  const nav = useNavigate()

  const submit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setError("")
    login(email)

    toast.success("Logged in successfully") // ✅ HERE

    nav("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-900">
          Login
        </h2>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-md p-2
                       focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border rounded-md p-2
                       focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          className="w-full bg-yellow-500 text-black py-2 rounded-md font-medium
                     hover:bg-yellow-400 transition"
        >
          Login
        </button>
      </form>

    </div>
  )
}