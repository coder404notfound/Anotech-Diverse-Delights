import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProductById } from "../services/api"
import { useCartStore } from "../store/useCartStore"
import toast from "react-hot-toast" // ✅ ADD THIS

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qty, setQty] = useState(1)

  const addToCart = useCartStore((s) => s.addToCart)

  useEffect(() => {
    setLoading(true)
    setError(null)

    getProductById(id)
      .then((res) => setProduct(res))
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    addToCart({ ...product, quantity: qty })
    setQty(1)

    toast.success("Added to cart") // ✅ THIS LINE
  }

  if (loading)
    return <p className="p-6 text-gray-600">Loading product...</p>

  if (error)
    return <p className="p-6 text-red-500">{error}</p>

  if (!product)
    return <p className="p-6 text-gray-500">Product not found</p>

  return (
    <div className="p-6 flex justify-center bg-gray-50 min-h-screen">
      <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-8 grid md:grid-cols-2 gap-10">

        <div className="flex items-center justify-center bg-gray-100 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        <div className="space-y-5">

          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {product.title}
          </h1>

          <p className="text-2xl font-semibold text-yellow-600">
            ${product.price}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Qty:</span>

            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              -
            </button>

            <span className="w-8 text-center">{qty}</span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Total: ${(product.price * qty).toFixed(2)}
          </p>

          <div className="flex gap-3">

            <button
              onClick={handleAdd}
              className="flex-1 bg-gray-900 text-white py-3 rounded-lg
                         hover:bg-gray-800 hover:shadow-md
                         focus:outline-none focus:ring-2 focus:ring-yellow-500
                         transition font-medium"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="flex-1 border border-gray-300 py-3 rounded-lg
                         hover:bg-gray-100 transition"
            >
              Go to Cart
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}