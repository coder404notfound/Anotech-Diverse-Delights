import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useCartStore } from "../store/useCartStore"
import toast from "react-hot-toast"

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore()
  const cart = useCartStore((s) => s.cart)

  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) =>
    location.pathname.startsWith(path)

  const totalItems = cart.reduce(
    (s, i) => s + i.quantity,
    0
  )

  const linkBase =
    "px-4 py-2 rounded-md text-sm font-medium transition"

  const active = "bg-yellow-500 text-black"
  const inactive = "text-gray-200 hover:bg-gray-800"

  return (
    <nav className="bg-gray-900 px-6 py-3 flex justify-between items-center flex-wrap">

      {/* Logo */}
      <Link
        to="/"
        className="text-yellow-400 text-xl font-bold hover:text-yellow-300 transition"
      >
        Diverse Delights
      </Link>

      {/* Links */}
      <div className="flex gap-2 items-center flex-wrap">
        {isAuthenticated && (
          <>
            <Link
              to="/"
              className={`${linkBase} ${
                isActive("/") ? active : inactive
              }`}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`${linkBase} ${
                isActive("/products") ? active : inactive
              }`}
            >
              Products
            </Link>

            <Link
              to="/cart"
              className={`${linkBase} ${
                isActive("/cart") ? active : inactive
              }`}
            >
              Cart ({totalItems})
            </Link>

            <button
              onClick={() => {
                logout()
                toast.success("Logged out")
                navigate("/login")
              }}
              className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar